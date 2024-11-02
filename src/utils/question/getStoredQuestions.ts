import { LOCAL_STORAGE_KEY } from "./question.constants";

/**
 * Retrieves the list of previously asked questions from localStorage.
 * @returns Array of questions.
 */
export const getStoredQuestions = () => {
  const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};
