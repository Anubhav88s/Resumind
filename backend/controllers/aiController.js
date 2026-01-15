import { GoogleGenerativeAI } from '@google/generative-ai';
import pdf from 'pdf-parse';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const UPLOADS_DIR = path.join(__dirname, '../uploads');

const chat = async (req, res) => {
    try {
        const { messages } = req.body;

        if (!process.env.GEMINI_API_KEY) {
            return res.json({
                message: {
                    content: JSON.stringify({
                        summary: "Gemini API Key missing. Please add GEMINI_API_KEY to backend/.env",
                        ATS: { score: 0, tips: ["Config Error"] },
                        techStack: [],
                        softSkills: [],
                        improvements: []
                    })
                }
            });
        }

        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });

        let prompt = "";
        let context = "";

        // Flatten messages to a single prompt for Gemini Pro (text-only) or build history
        // Gemini Pro supports chat history, but for resume analysis usually a single context dump works best.

        if (messages && Array.isArray(messages)) {
            for (const msg of messages) {
                if (Array.isArray(msg.content)) {
                    for (const part of msg.content) {
                        if (part.type === 'text') {
                            prompt += part.text + "\n";
                        } else if (part.type === 'file') {
                            const filePath = path.join(UPLOADS_DIR, part.puter_path);
                            console.log("Processing file:", filePath);
                            if (fs.existsSync(filePath)) {
                                console.log("File exists, reading...");
                                const dataBuffer = fs.readFileSync(filePath);
                                const data = await pdf(dataBuffer);
                                console.log("PDF Parsed, length:", data.text.length);
                                context += `\n[RESUME CONTEXT START]\n${data.text}\n[RESUME CONTEXT END]\n`;
                            } else {
                                console.error("File NOT found:", filePath);
                            }
                        }
                    }
                } else {
                    prompt += msg.content + "\n";
                }
            }
        }

        console.log("AI Chat Request | Messages:", JSON.stringify(messages, null, 2));

        const finalPrompt = `
        You are an expert Resume Analyzer AI.
        
        ${context}
        
        Task: ${prompt}
        
        Analyze the resume context provided above alongside the user's prompt. 
        Return the response strictly in JSON format with the following structure:
        {
            "summary": "Brief professional summary...",
            "ATS": { "score": 85, "tips": ["Tip 1", "Tip 2"] },
            "techStack": ["React", "Node", ...],
            "softSkills": ["Communcation", ...],
            "improvements": ["Actionable improvement 1", ...]
        }
        Do not include markdown code blocks (like \`\`\`json). Just the raw JSON string.
        `;

        console.log("--- FINAL PROMPT TO GEMINI ---\n", finalPrompt, "\n------------------------------");

        const result = await model.generateContent(finalPrompt);
        const response = await result.response;
        const text = response.text();

        // Clean up markdown if Gemini adds it despite instruction
        const cleanText = text.replace(/```json/g, '').replace(/```/g, '').trim();

        res.json({ message: { content: cleanText } });

    } catch (err) {
        console.error("Gemini Error:", err);
        // Include stack trace or more details in dev
        res.status(500).json({
            error: "AI Processing Failed",
            details: err.message,
            stack: err.stack,
            fullError: JSON.stringify(err, Object.getOwnPropertyNames(err))
        });
    }
};

export { chat };
