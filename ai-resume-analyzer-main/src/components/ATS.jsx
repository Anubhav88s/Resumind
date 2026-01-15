import React from 'react'

/**
 * Represents a single suggestion for improvement.
 */


/**
 * Props for the ATS component.
 */


/**
 * ATS (Applicant Tracking System) Component.
 * Displays the ATS score, a visual indicator (icon and color), and a list of suggestions.
 *
 * @param {ATSProps} props - The component props.
 * @returns {JSX.Element} The rendered ATS score card.
 */
const ATS = ({ score, suggestions }) => {
  // Determine background gradient based on score
  const gradientClass = score > 69
    ? 'from-green-100'
    : score > 49
      ? 'from-yellow-100'
      : 'from-red-100';

  // Determine icon based on score
  const iconSrc = score > 69
    ? '/icons/ats-good.svg'
    : score > 49
      ? '/icons/ats-warning.svg'
      : '/icons/ats-bad.svg';

  // Determine subtitle based on score
  const subtitle = score > 69
    ? 'Great Job!'
    : score > 49
      ? 'Good Start'
      : 'Needs Improvement';

  return (
    <div className={`rounded-2xl w-full p-2`}>
      {/* Top section with icon and headline */}
      <div className="flex items-center gap-4 mb-6">
        <div className={`p-3 rounded-xl ${score > 69 ? 'bg-green-500/20' : score > 49 ? 'bg-amber-500/20' : 'bg-red-500/20'}`}>
          <img src={iconSrc} alt="ATS Score Icon" className="w-8 h-8" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white">ATS Score <span className={score > 69 ? 'text-green-400' : score > 49 ? 'text-amber-400' : 'text-red-400'}>{score}/100</span></h2>
          <p className="text-sm font-medium text-gray-400">{subtitle}</p>
        </div>
      </div>

      {/* Description section */}
      <div className="mb-6">
        <p className="text-gray-400 mb-6 text-sm leading-relaxed">
          This score represents how well your resume is likely to perform in Applicant Tracking Systems used by employers.
        </p>

        {/* Suggestions list */}
        <div className="space-y-4">
          {suggestions.map((suggestion, index) => (
            <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors border border-dashed border-gray-800 hover:border-gray-700">
              <div className={`mt-0.5 min-w-[20px] h-5 rounded-full flex items-center justify-center ${suggestion.type === "good" ? "bg-emerald-500/20 text-emerald-400" : "bg-amber-500/20 text-amber-400"}`}>
                {suggestion.type === "good" ? (
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                ) : (
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                )}
              </div>
              <p className={`text-sm ${suggestion.type === "good" ? "text-gray-300" : "text-gray-300"}`}>
                {suggestion.tip}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Closing encouragement */}
      <p className="text-xs text-gray-400 italic text-center border-t border-gray-100 pt-4">
        "Keep refining your resume to improve your chances of getting past ATS filters"
      </p>
    </div>
  )
}

export default ATS
