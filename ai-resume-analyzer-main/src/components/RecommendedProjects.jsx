import { useEffect, useState } from 'react';
import { getRecommendedProjects } from '~/data/projects';



const RecommendedProjects = ({ role }) => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        const recommended = getRecommendedProjects(role);
        setProjects(recommended);
    }, [role]);

    if (projects.length === 0) {
        return null;
    }

    return (
        <div className="mt-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Recommended Projects to Build</h3>
            <div className="flex flex-col gap-4">
                {projects.map((project) => (
                    <div key={project.id} className="p-5 bg-dark-card rounded-2xl shadow-sm border border-gray-800 hover:shadow-glow hover:border-primary/50 transition-all duration-300 group flex flex-col gap-3">
                        <div className="flex justify-between items-start">
                            <h4 className="text-lg font-bold text-white group-hover:text-primary transition-colors line-clamp-1">{project.title}</h4>
                            <span className={`px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-full border ${project.difficulty === 'Beginner' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                                project.difficulty === 'Intermediate' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                                    'bg-rose-500/10 text-rose-400 border-rose-500/20'
                                }`}>
                                {project.difficulty}
                            </span>
                        </div>

                        <p className="text-gray-400 text-sm leading-relaxed line-clamp-2">{project.description}</p>

                        <div className="flex flex-wrap gap-2 pt-1">
                            {project.technologies.map((tech) => (
                                <span key={tech} className="px-2 py-0.5 bg-white/5 text-gray-300 text-[10px] font-medium uppercase tracking-wide rounded border border-white/10">
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecommendedProjects;
