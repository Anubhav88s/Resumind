import { cn } from "~/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionHeader,
  AccordionItem,
} from "./Accordion";

/**
 * Component to display a score badge with color coding based on the score value.
 *
 * @param {Object} props - The component props.
 * @param {number} props.score - The score to display (0-100).
 */
const ScoreBadge = ({ score }) => {
  return (
    <div
      className={cn(
        "flex flex-row gap-1 items-center px-2 py-0.5 rounded-[96px]",
        score > 69
          ? "bg-badge-green"
          : score > 39
            ? "bg-badge-yellow"
            : "bg-badge-red"
      )}
    >
      <img
        src={score > 69 ? "/icons/check.svg" : "/icons/warning.svg"}
        alt="score"
        className="size-4"
      />
      <p
        className={cn(
          "text-sm font-medium",
          score > 69
            ? "text-badge-green-text"
            : score > 39
              ? "text-badge-yellow-text"
              : "text-badge-red-text"
        )}
      >
        {score}/100
      </p>
    </div>
  );
};

/**
 * Header component for each category in the details section.
 * Displays the category title and its score.
 *
 * @param {Object} props - The component props.
 * @param {string} props.title - The title of the category.
 * @param {number} props.categoryScore - The score for the category.
 */
const CategoryHeader = ({
  title,
  categoryScore,
}) => {
  return (
    <div className="flex flex-row gap-4 items-center py-2">
      <p className="text-2xl font-semibold">{title}</p>
      <ScoreBadge score={categoryScore} />
    </div>
  );
};

/**
 * Content component for each category.
 * Displays a list of tips and detailed explanations for improvement.
 *
 * @param {Object} props - The component props.
 * @param {Array} props.tips - Array of tips with type, tip text, and explanation.
 */
const CategoryContent = ({
  tips,
}) => {
  return (
    <div className="flex flex-col gap-4 w-full">
      {tips.map((tip, index) => (
        <div key={index} className="flex gap-4 p-4 rounded-xl bg-dark-card border border-gray-800 hover:bg-white/5 transition-colors">
          <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-0.5 ${tip.type === 'good' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'}`}>
            {tip.type === 'good' ? (
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
            ) : (
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
            )}
          </div>
          <div>
            <h4 className={`text-sm font-bold mb-1 ${tip.type === 'good' ? 'text-white' : 'text-white'}`}>
              {tip.type === 'good' ? 'Strength' : 'Improvement Area'}
            </h4>
            <p className="text-gray-400 text-sm leading-relaxed">{tip.tip}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

/**
 * Details component.
 * Displays detailed feedback for different categories (Tone & Style, Content, Structure, Skills) using an accordion.
 *
 * @param {Object} props - The component props.
 * @param {Feedback} props.feedback - The feedback object containing scores and tips for each category.
 */
const Details = ({ feedback }) => {
  return (
    <div className="flex flex-col gap-4 w-full">
      <Accordion>
        <AccordionItem id="tone-style">
          <AccordionHeader itemId="tone-style">
            <CategoryHeader
              title="Tone & Style"
              categoryScore={feedback.toneAndStyle.score}
            />
          </AccordionHeader>
          <AccordionContent itemId="tone-style">
            <CategoryContent tips={feedback.toneAndStyle.tips} />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem id="content">
          <AccordionHeader itemId="content">
            <CategoryHeader
              title="Content"
              categoryScore={feedback.content.score}
            />
          </AccordionHeader>
          <AccordionContent itemId="content">
            <CategoryContent tips={feedback.content.tips} />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem id="structure">
          <AccordionHeader itemId="structure">
            <CategoryHeader
              title="Structure"
              categoryScore={feedback.structure.score}
            />
          </AccordionHeader>
          <AccordionContent itemId="structure">
            <CategoryContent tips={feedback.structure.tips} />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem id="skills">
          <AccordionHeader itemId="skills">
            <CategoryHeader
              title="Skills"
              categoryScore={feedback.skills.score}
            />
          </AccordionHeader>
          <AccordionContent itemId="skills">
            <CategoryContent tips={feedback.skills.tips} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default Details;
