import { Link, useNavigate, useParams, useLocation } from "react-router";
import { useEffect, useState } from "react";
import { useAuthStore } from "~/lib/api";
import Summary from "~/components/Summary";
import ATS from "~/components/ATS";
import Details from "~/components/Details";
import RecommendedJobs from "~/components/RecommendedJobs";
import RecommendedProjects from '~/components/RecommendedProjects';
import RecommendedKeywords from '~/components/RecommendedKeywords';

export const meta = () => ([
    { title: 'Resumind | Review ' },
    { name: 'description', content: 'Detailed overview of your resume' },
])

/**
 * Resume component.
 * Displays the detailed analysis of a specific resume.
 * Includes summary, ATS score, detailed feedback, and recommendations for jobs, projects, and keywords.
 *
 * @returns {JSX.Element} The rendered Resume Review page.
 */
const Resume = () => {
    const { auth, isLoading, fs, kv } = useAuthStore();
    const { id } = useParams();
    const [imageUrl, setImageUrl] = useState('');
    const [resumeUrl, setResumeUrl] = useState('');
    const [jobTitle, setJobTitle] = useState('');
    const [feedback, setFeedback] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoading && !auth.isAuthenticated) navigate(`/auth?next=/resume/${id}`);
    }, [isLoading, id])

    const location = useLocation();

    useEffect(() => {
        const loadResume = async () => {
            let data;

            // Try to get data from navigation state first (ephemeral)
            if (location.state) {
                data = location.state;
            } else {
                // Fallback to KV if state is missing (though KV write was removed in upload)
                const resume = await kv.get(`resume:${id}`);
                if (resume) {
                    data = JSON.parse(resume);
                }
            }

            if (!data) return;

            // Handle blob loading
            const resumeBlob = await fs.read(data.resumePath);
            if (!resumeBlob) return;

            const pdfBlob = new Blob([resumeBlob], { type: 'application/pdf' });
            const resumeUrl = URL.createObjectURL(pdfBlob);
            setResumeUrl(resumeUrl);

            const imageBlob = await fs.read(data.imagePath);
            if (!imageBlob) return;
            const imageUrl = URL.createObjectURL(imageBlob);
            setImageUrl(imageUrl);

            setFeedback(data.feedback);
            setJobTitle(data.jobTitle);
            console.log({ resumeUrl, imageUrl, feedback: data.feedback });
        }

        loadResume();
    }, [id, location.state]);

    return (
        <main className="min-h-screen relative">
            {/* Top Navigation Bar */}
            <nav className="fixed top-0 left-0 right-0 z-50 glass-panel border-b border-gray-800 px-6 py-4 flex items-center justify-between">
                <Link to="/" className="flex items-center gap-2 group text-gray-400 hover:text-primary transition-colors">
                    <div className="p-2 rounded-full bg-white/5 group-hover:bg-indigo-500/10 transition-colors">
                        <img src="/icons/back.svg" alt="back" className="w-4 h-4 opacity-70 group-hover:opacity-100 invert" />
                    </div>
                    <span className="font-semibold text-sm">Back to Homepage</span>
                </Link>
                <div className="text-xl font-bold text-white tracking-tight">RESUMIND</div>
                <div className="w-24"></div> {/* Spacer for centering if needed, or just empty */}
            </nav>

            <div className="pt-24 px-4 sm:px-6 md:px-8 max-w-[1920px] mx-auto flex flex-col lg:flex-row gap-8 xl:gap-12 pb-20">
                {/* Left Column Preview (Sticky) */}
                <section className="w-full lg:w-[45%] xl:w-[40%] flex flex-col gap-6">
                    <div className="lg:sticky lg:top-28 h-[600px] lg:h-[calc(100vh-8rem)] transition-all ease-in-out duration-300">
                        {imageUrl && resumeUrl ? (
                            <div className="w-full h-full bg-dark-card rounded-3xl p-3 border border-gray-800 shadow-xl animate-in fade-in slide-in-from-left-4 duration-700 flex flex-col">
                                <div className="flex items-center justify-between px-4 py-3 border-b border-gray-800 mb-2">
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                                        <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
                                        <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                                    </div>
                                    <span className="text-xs font-medium text-gray-500 uppercase tracking-widest">Original PDF</span>
                                </div>
                                <a href={resumeUrl} target="_blank" rel="noopener noreferrer" className="flex-1 w-full h-full relative group overflow-hidden rounded-xl bg-gray-900">
                                    <img
                                        src={imageUrl}
                                        className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-[1.02] opacity-90 group-hover:opacity-100"
                                        title="Click to view PDF"
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-all backdrop-blur-[2px]">
                                        <span className="bg-white/10 text-white font-semibold px-6 py-2.5 rounded-full shadow-lg border border-white/20 transform translate-y-4 group-hover:translate-y-0 transition-transform hover:bg-white/20">View Original</span>
                                    </div>
                                </a>
                            </div>
                        ) : (
                            <div className="w-full h-full rounded-3xl border border-dashed border-gray-800 flex items-center justify-center bg-dark-card/50">
                                <div className="animate-pulse flex flex-col items-center gap-4 opacity-30">
                                    <div className="w-16 h-16 bg-gray-600 rounded-full"></div>
                                    <div className="h-5 w-40 bg-gray-600 rounded-full"></div>
                                    <div className="h-4 w-24 bg-gray-600 rounded-full"></div>
                                </div>
                            </div>
                        )}
                    </div>
                </section>

                {/* Right Column Feedback */}
                <section className="w-full lg:w-[55%] xl:w-[60%] flex flex-col gap-10 animate-in fade-in slide-in-from-right-4 duration-700 delay-100">
                    <header className="space-y-3 pb-2 border-b border-gray-800">
                        <div className="flex items-center gap-3">
                            <span className="px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-bold uppercase tracking-wider border border-indigo-500/20">Results Ready</span>
                            <span className="text-gray-600 text-sm">|</span>
                            <span className="text-gray-400 text-sm font-medium">Job Title: <span className="text-white">{jobTitle || 'Not specified'}</span></span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">Analysis Report</h1>
                        <p className="text-xl text-gray-400 font-light max-w-2xl">
                            Here is a detailed breakdown of your resume's performance against AI screening tools.
                        </p>
                    </header>

                    {feedback ? (
                        <div className="flex flex-col gap-12 pb-24">
                            {/* Score Summary */}
                            <Summary feedback={feedback} />

                            {/* ATS & Details Grid */}
                            <div className="grid grid-cols-1 gap-12">
                                <div className="space-y-6">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-blue-500/10 text-blue-400 rounded-lg border border-blue-500/20">
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                        </div>
                                        <h3 className="text-2xl font-bold text-white">ATS Optimization</h3>
                                    </div>
                                    <div className="bg-dark-card p-1 rounded-3xl shadow-sm border border-gray-800">
                                        <ATS score={feedback.ATS.score || 0} suggestions={feedback.ATS.tips || []} />
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-purple-500/10 text-purple-400 rounded-lg border border-purple-500/20">
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path></svg>
                                        </div>
                                        <h3 className="text-2xl font-bold text-white">Deep Dive Analysis</h3>
                                    </div>
                                    <Details feedback={feedback} />
                                </div>
                            </div>

                            {/* Recommendations Section */}
                            <div className="pt-10 border-t border-gray-800">
                                <span className="px-4 py-1.5 rounded-full bg-white text-dark-bg text-xs font-bold uppercase tracking-wider mb-8 inline-block shadow-glow">Next Steps</span>

                                <div className="space-y-12">
                                    <RecommendedJobs role={jobTitle} />

                                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                                        <RecommendedProjects role={jobTitle} />
                                        <RecommendedKeywords role={jobTitle} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center p-20 bg-dark-card rounded-3xl border border-gray-800 shadow-sm min-h-[400px]">
                            <div className="relative">
                                <div className="absolute inset-0 bg-indigo-500 rounded-full animate-ping opacity-20"></div>
                                <img src="/images/resume-scan-2.gif" className="max-w-[240px] relative z-10 mix-blend-screen opacity-60" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mt-8 mb-2">Analyzing Resume...</h3>
                            <p className="text-gray-500">Our AI is reading your document and generating insights.</p>
                        </div>
                    )}
                </section>
            </div>
        </main>
    )
}
export default Resume
