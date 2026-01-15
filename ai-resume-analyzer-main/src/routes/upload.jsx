import { useState, useEffect } from 'react'
import Navbar from "~/components/Navbar";
import FileUploader from "~/components/FileUploader";
import { useAuthStore } from "~/lib/api";
import { useNavigate } from "react-router";
import { convertPdfToImage } from "~/lib/pdf2img";
import { generateUUID } from "~/lib/utils";
import { prepareInstructions } from "~/lib/analysis";

/**
 * Upload component.
 * Allows users to upload their resume and enter job details for analysis.
 * Handles the file upload, conversion to image, and AI analysis process.
 *
 * @returns {JSX.Element} The rendered Upload page.
 */
const Upload = () => {
    const { auth, isLoading, fs, ai, kv } = useAuthStore();
    const navigate = useNavigate();
    const [isProcessing, setIsProcessing] = useState(false);
    const [statusText, setStatusText] = useState('');
    const [file, setFile] = useState(null);

    useEffect(() => {
        if (!isLoading && !auth.isAuthenticated) {
            navigate("/auth?next=/upload");
        }
    }, [isLoading, auth.isAuthenticated, navigate]);

    const handleFileSelect = (file) => {
        setFile(file)
    }

    const handleAnalyze = async ({ companyName, jobTitle, jobDescription, file }) => {
        setIsProcessing(true);

        setStatusText('Uploading the file...');
        const uploadedFile = await fs.upload([file]);
        if (!uploadedFile) return setStatusText('Error to upload file');

        setStatusText('Converting to image...');
        const imageFile = await convertPdfToImage(file);
        if (!imageFile.file) return setStatusText('Error to convert PDF to image');

        setStatusText('Uploading the image...');
        const uploadedImage = await fs.upload([imageFile.file]);
        if (!uploadedImage) return setStatusText('Error to upload image');

        setStatusText('Preparing data...');
        const uuid = generateUUID();
        const data = {
            id: uuid,
            resumePath: uploadedFile.path,
            imagePath: uploadedImage.path,
            companyName, jobTitle, jobDescription,
            feedback: '',
        }
        // Removed kv.set as requested ("dont need to save resume any where")

        setStatusText('Analyzing...');

        const feedback = await ai.feedback(
            uploadedFile.path,
            prepareInstructions({ jobTitle, jobDescription })
        )
        if (!feedback) return setStatusText('Error to analyze resume');

        const feedbackText = typeof feedback.message.content === 'string' ? feedback.message.content : feedback.message.content[0].text;

        data.feedback = JSON.parse(feedbackText);
        // Removed kv.set as requested
        setStatusText('Analysis complete, redirecting...');
        // Cleanup files from backend as requested
        // await fs.delete(data.resumePath);
        // await fs.delete(data.imagePath);

        // Pass data via state to avoid persistence
        navigate(`/resume/${uuid}`, { state: data });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.currentTarget.closest('form');
        if (!form) return;
        const formData = new FormData(form);

        const companyName = formData.get('company-name');
        const jobTitle = formData.get('job-title');
        const jobDescription = formData.get('job-description');

        if (!file) return;

        handleAnalyze({ companyName, jobTitle, jobDescription, file });
    }

    return (
        <main className="relative z-10 w-full min-h-screen pb-20">
            <Navbar />

            <section className="page-container flex flex-col items-center">
                <div className="py-16 text-center max-w-3xl mx-auto space-y-4">
                    <h1 className="text-gradient font-bold">Smart feedback for your dream job</h1>
                    {isProcessing ? (
                        <div className="flex flex-col items-center gap-6 animate-in fade-in duration-500">
                            <h2 className="text-2xl font-medium text-dark-100">{statusText}</h2>
                            <div className="w-full max-w-md bg-white/50 backdrop-blur-sm rounded-2xl p-4 border border-white/60 shadow-lg">
                                <img src="/images/resume-scan.gif" className="w-full rounded-lg mix-blend-multiply opacity-80" />
                            </div>
                        </div>
                    ) : (
                        <h2 className="text-xl text-dark-200">Drop your resume for an ATS score and improvement tips</h2>
                    )}
                </div>

                {!isProcessing && (
                    <div className="w-full max-w-3xl glass-panel rounded-3xl p-8 md:p-12 animate-in slide-in-from-bottom-8 duration-700">
                        <form id="upload-form" onSubmit={handleSubmit} className="flex flex-col gap-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                                <div className="space-y-2">
                                    <label htmlFor="company-name">Company Name</label>
                                    <input
                                        type="text"
                                        name="company-name"
                                        placeholder="e.g. Google, Amazon..."
                                        id="company-name"
                                        className="bg-white/5"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="job-title">Job Title</label>
                                    <input
                                        type="text"
                                        name="job-title"
                                        placeholder="e.g. Senior Frontend Engineer"
                                        id="job-title"
                                        className="bg-white/5"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2 w-full">
                                <label htmlFor="job-description">Job Description</label>
                                <textarea
                                    rows={5}
                                    name="job-description"
                                    placeholder="Paste the job description here..."
                                    id="job-description"
                                    className="resize-none bg-white/5"
                                />
                            </div>

                            <div className="space-y-2 w-full">
                                <label htmlFor="uploader" className="mb-4 block">Upload Resume</label>
                                <FileUploader onFileSelect={handleFileSelect} />
                            </div>

                            <button className="btn-primary w-full py-4 text-lg font-semibold shadow-xl hover:shadow-2xl hover:-translate-y-0.5" type="submit">
                                Analyze Resume
                            </button>
                        </form>
                    </div>
                )}
            </section>
        </main>
    )
}
export default Upload
