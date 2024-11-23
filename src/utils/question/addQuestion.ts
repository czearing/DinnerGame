import { MAX_QUESTIONS } from "./question.constants";

/**
 * Adds a new question to the list, ensuring no duplicates and enforcing a maximum cap.
 * @param currentQuestions - Current list of questions.
 * @param  newQuestion - The new question to add.
 * @returns  Updated list of questions.
 */
export const addQuestion = (
  currentQuestions: string[],
  newQuestion: string
) => {
  if (currentQuestions.includes(newQuestion)) {
    return currentQuestions;
  }

  const updatedQuestions = [newQuestion, ...currentQuestions];

  if (updatedQuestions.length > MAX_QUESTIONS) {
    return updatedQuestions.slice(updatedQuestions.length - MAX_QUESTIONS);
  }

  return updatedQuestions;
};
