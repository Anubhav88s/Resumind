import { useEffect, useState } from 'react';
import { getRecommendedKeywords } from '~/data/keywords';



const RecommendedKeywords = ({ role }) => {
    const [keywords, setKeywords] = useState([]);

    useEffect(() => {
        const recommended = getRecommendedKeywords(role);
        setKeywords(recommended);
    }, [role]);

    if (keywords.length === 0) {
        return null;
    }

    const copyToClipboard = (keyword) => {
        navigator.clipboard.writeText(keyword);
        // Optional a toast notification here
    };

    return (
        <div className="mt-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Recommended Keywords</h3>
            <p className="text-gray-600 mb-4">Include these keywords in your resume to increase your chances of passing ATS filters.</p>
            <div className="flex flex-wrap gap-2.5">
                {keywords.map((keyword, index) => (
                    <button
                        key={index}
                        onClick={() => copyToClipboard(keyword)}
                        className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-gray-300 text-sm font-medium hover:bg-primary hover:border-primary hover:text-white transition-all duration-300 hover:scale-105 active:scale-95 shadow-sm hover:shadow-glow flex items-center gap-2 group"
                    >
                        <span>{keyword}</span>
                        <svg className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity -ml-1 group-hover:ml-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default RecommendedKeywords;
