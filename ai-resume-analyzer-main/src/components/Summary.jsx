import ScoreGauge from "~/components/ScoreGauge";
import ScoreBadge from "~/components/ScoreBadge";

/**
 * Category component.
 * Displays a single category score with a title and a badge.
 *
 * @param {Object} props - The component props.
 * @param {string} props.title - The title of the category.
 * @param {number} props.score - The score of the category.
 */
const Category = ({ title, score }) => {
    let colorClass, bgClass, textClass;

    if (score >= 80) {
        colorClass = "bg-emerald-500";
        bgClass = "bg-emerald-100";
        textClass = "text-emerald-700";
    } else if (score >= 50) {
        colorClass = "bg-amber-500";
        bgClass = "bg-amber-100";
        textClass = "text-amber-700";
    } else {
        colorClass = "bg-rose-500";
        bgClass = "bg-rose-100";
        textClass = "text-rose-700";
    }

    return (
        <div className="flex flex-col gap-2">
            <div className="flex justify-between items-end">
                <span className="font-medium text-gray-300">{title}</span>
                <span className={`font-bold ${textClass}`}>{score}/100</span>
            </div>
            <div className={`h-2.5 w-full rounded-full ${bgClass} bg-opacity-20`}>
                <div
                    className={`h-2.5 rounded-full transition-all duration-1000 ease-out ${colorClass}`}
                    style={{ width: `${score}%` }}
                ></div>
            </div>
        </div>
    )
}

/**
 * Summary component.
 * Displays the overall resume score and a breakdown of scores by category.
 *
 * @param {Object} props - The component props.
 * @param {Feedback} props.feedback - The feedback object containing scores for different categories.
 */
const Summary = ({ feedback }) => {
    return (
        <div className="bg-dark-card rounded-3xl shadow-sm border border-gray-800 overflow-hidden">
            <div className="p-8 md:p-10 grid md:grid-cols-2 gap-10 items-center">
                {/* Left: Overall Score */}
                <div className="flex flex-col items-center justify-center text-center p-4">
                    <div className="relative mb-6 transform hover:scale-105 transition-transform duration-300">
                        <ScoreGauge score={feedback.overallScore} />
                    </div>
                    <div>
                        <h2 className="text-3xl font-bold text-white mb-2">Overall Score</h2>
                        <p className="text-gray-400 text-sm max-w-[240px] mx-auto leading-relaxed">
                            Based on industry standards and ATS best practices.
                        </p>
                    </div>
                </div>

                {/* Right: Categories */}
                <div className="flex flex-col justify-center gap-7 w-full border-l border-gray-800 pl-10">
                    <Category title="Tone & Style" score={feedback.toneAndStyle.score} />
                    <Category title="Content" score={feedback.content.score} />
                    <Category title="Structure" score={feedback.structure.score} />
                    <Category title="Skills" score={feedback.skills.score} />
                    <Category title="Impact" score={feedback.impact?.score || 85} />
                </div>
            </div>

            <div className="bg-white/5 px-8 py-4 border-t border-gray-800 flex justify-between items-center text-sm text-gray-500">
                <span>AI-Generated Analysis</span>
                <span>Last updated just now</span>
            </div>
        </div>
    )
}
export default Summary
