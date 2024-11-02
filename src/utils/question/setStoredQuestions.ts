import { LOCAL_STORAGE_KEY } from "./question.constants";

/**
 * Saves the list of previously asked questions to localStorage.
 * @param questions - Array of questions to store.
 */
export const setStoredQuestions = (questions: string[]) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(questions));
};
