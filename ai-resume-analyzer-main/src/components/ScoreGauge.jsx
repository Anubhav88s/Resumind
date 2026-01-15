import { useEffect, useRef, useState } from "react";

/**
 * ScoreGauge component.
 * Displays a semi-circular gauge indicating the score.
 *
 * @param {Object} props - The component props.
 * @param {number} props.score - The score to display (0-100).
 * @returns {JSX.Element} The rendered ScoreGauge.
 */
const ScoreGauge = ({ score = 75 }) => {
    const [pathLength, setPathLength] = useState(0);
    const pathRef = useRef(null);

    const percentage = score / 100;

    useEffect(() => {
        if (pathRef.current) {
            setPathLength(pathRef.current.getTotalLength());
        }
    }, []);

    return (
        <div className="flex flex-col items-center">
            <div className="relative w-56 h-28">
                <svg viewBox="0 0 100 50" className="w-full h-full drop-shadow-xl">
                    <defs>
                        <linearGradient
                            id="gaugeGradient"
                            x1="0%"
                            y1="0%"
                            x2="100%"
                            y2="0%"
                        >
                            <stop offset="0%" stopColor="#818cf8" />
                            <stop offset="100%" stopColor="#c084fc" />
                        </linearGradient>
                    </defs>

                    {/* Background arc */}
                    <path
                        d="M10,50 A40,40 0 0,1 90,50"
                        fill="none"
                        stroke="#1f2937"
                        strokeWidth="8"
                        strokeLinecap="round"
                    />

                    {/* Foreground arc */}
                    <path
                        ref={pathRef}
                        d="M10,50 A40,40 0 0,1 90,50"
                        fill="none"
                        stroke="url(#gaugeGradient)"
                        strokeWidth="8"
                        strokeLinecap="round"
                        strokeDasharray={pathLength}
                        strokeDashoffset={pathLength * (1 - percentage)}
                        className="transition-all duration-1500 ease-out"
                    />
                </svg>

                <div className="absolute inset-x-0 bottom-0 flex flex-col items-center justify-end pb-2">
                    <span className="text-5xl font-bold text-white tracking-tight">{score}</span>
                    <span className="text-xs text-indigo-400 uppercase tracking-widest font-bold mt-1">Score</span>
                </div>
            </div>
        </div>
    );
};

export default ScoreGauge;
