import { HISTORY_LIMIT } from "./question";
/**
 * Generates instructions for the OpenAI API based on previously asked questions.
 * @param questions - Array of previously asked questions.
 * @returns Instructions string.
 */
export const generateInstructions = (questions: string[]) => {
  if (questions.length === 0) {
    return "Give me a question.";
  }

  const recentQs = questions.slice(-HISTORY_LIMIT);
  const formattedQs = recentQs
    .map((q, index) => `${index + 1}. ${q}`)
    .join("\n");

  return `Give me a new question. Please ensure it is not any of the following previously asked questions:\n${formattedQs}`;
};
