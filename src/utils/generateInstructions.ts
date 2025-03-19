import { HISTORY_LIMIT } from "./question";
/**
 * Generates instructions for the OpenAI API based on previously asked questions.
 * @param questions - Array of previously asked questions.
 * @returns Instructions string.
 */
export const generateInstructions = (questions: string[]) => {
  if (questions.length === 0) {
    return "Please generate a new question.";
  }

  // Get the most recent questions (last HISTORY_LIMIT items)
  // Simple slice from the end of the array
  const recentQs = questions.slice(-HISTORY_LIMIT);
  const formattedQs = recentQs.map((q) => `• ${q}`).join("\n");

  console.log(questions);
  return `Please generate an interesting, thoughtful question that would spark meaningful conversation at a dinner table. The question should:

1. Be direct and concise (no more than 20 words)
2. Avoid hypothetical transformations (like "if X were Y") unless truly insightful
3. Focus on real life experiences, values, or perspectives
4. Be distinct from these previous questions:

${formattedQs}

Your question should be different in both structure and topic from the pattern of recent questions. Aim for variety in how you phrase questions.`;
};
