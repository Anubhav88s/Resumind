import { Link } from "react-router";
import ScoreCircle from "~/components/ScoreCircle";
import { useEffect, useState } from "react";
import { useAuthStore } from "~/lib/api";

/**
 * ResumeCard component.
 * Displays a summary card for a resume, including its score and a thumbnail.
 *
 * @param {Object} props - The component props.
 * @param {Resume} props.resume - The resume object containing details and feedback.
 * @returns {JSX.Element} The rendered ResumeCard.
 */
const ResumeCard = ({ resume: { id, companyName, jobTitle, feedback, imagePath } }) => {
    const { fs } = useAuthStore();
    const [resumeUrl, setResumeUrl] = useState('');

    useEffect(() => {
        const loadResume = async () => {
            const blob = await fs.read(imagePath);
            if (!blob) return;
            let url = URL.createObjectURL(blob);
            setResumeUrl(url);
        }

        loadResume();
    }, [imagePath]);

    return (
        <Link to={`/resume/${id}`} className="resume-card-modern group animate-in fade-in duration-700 hover:-translate-y-1">
            <div className="flex flex-row gap-4 justify-between items-start mb-6 w-full">
                <div className="flex flex-col gap-1 flex-1 min-w-0">
                    {companyName ? (
                        <h2 className="text-xl font-bold text-white truncate group-hover:text-primary transition-colors">
                            {companyName}
                        </h2>
                    ) : (
                        <h2 className="text-xl font-bold text-white">Resume</h2>
                    )}
                    {jobTitle && (
                        <h3 className="text-sm font-medium text-text-secondary truncate">{jobTitle}</h3>
                    )}
                </div>
                <div className="flex-shrink-0 transition-transform duration-300 group-hover:scale-110">
                    <ScoreCircle score={feedback.overallScore} />
                </div>
            </div>

            {resumeUrl ? (
                <div className="w-full flex-1 rounded-2xl overflow-hidden shadow-inner border border-gray-800 bg-gray-900 relative group-hover:shadow-glow transition-all">
                    <img
                        src={resumeUrl}
                        alt="resume preview"
                        className="w-full h-full object-cover object-top opacity-80 group-hover:opacity-100 transition-opacity duration-500 hover:scale-105 transform"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
            ) : (
                <div className="w-full flex-1 rounded-2xl bg-white/5 flex items-center justify-center border border-dashed border-gray-700 group-hover:border-primary/50 transition-colors">
                    <span className="text-gray-500 text-sm">No Preview</span>
                </div>
            )}
        </Link>
    )
}
export default ResumeCard
