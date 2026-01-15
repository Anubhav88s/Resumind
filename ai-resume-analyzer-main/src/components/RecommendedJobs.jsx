import { useEffect, useState } from 'react';
import { getRecommendedJobs } from '~/data/jobs';



const RecommendedJobs = ({ role }) => {
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        const recommended = getRecommendedJobs(role);
        setJobs(recommended);
    }, [role]);

    if (jobs.length === 0) {
        return (
            <div className="mt-8 p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Recommended Jobs</h3>
                <p className="text-gray-500">No specific job recommendations found for "{role}". Try searching for broader roles.</p>
            </div>
        );
    }

    return (
        <div className="mt-12 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                Recommended Jobs for You
                <span className="text-xs font-normal px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-700">AI Matched</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {jobs.map((job) => (
                    <div key={job.id} className="p-6 bg-dark-card rounded-2xl shadow-sm border border-gray-800 hover:shadow-glow hover:border-primary/50 transition-all duration-300 group">
                        <div className="flex justify-between items-start mb-2">
                            <div>
                                <h4 className="text-lg font-bold text-white group-hover:text-primary transition-colors">{job.title}</h4>
                                <p className="text-sm font-medium text-gray-400">{job.company}</p>
                            </div>
                            <span className="px-3 py-1 bg-white/5 text-gray-300 text-xs font-semibold rounded-full border border-white/10">
                                {job.type}
                            </span>
                        </div>

                        <div className="flex items-center gap-4 text-sm text-gray-500 mt-4 pt-4 border-t border-gray-800">
                            <div className="flex items-center gap-1.5">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                                {job.location}
                            </div>
                            <div className="flex items-center gap-1.5">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                {job.salary}
                            </div>
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t border-gray-800 mt-4">
                            <span className="text-xs text-gray-500 font-medium">Posted {job.postedAt}</span>
                            <button className="px-5 py-2 bg-dark-100 text-white text-sm font-medium rounded-xl hover:bg-primary hover:text-white transition-all shadow-md hover:shadow-lg cursor-pointer transform active:scale-95">
                                Apply Now
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecommendedJobs;
