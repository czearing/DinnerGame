import { LOCAL_STORAGE_KEY, MAX_QUESTIONS } from "./question.constants";

/**
 * Saves the list of previously asked questions to localStorage.
 * @param questions - Array of questions to store.
 */
export const setStoredQuestions = (questions: string[]): void => {
  try {
    const cappedQuestions = questions.slice(-MAX_QUESTIONS);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(cappedQuestions));
  } catch (error) {
    console.error("Failed to save questions to localStorage:", error);
    // Optionally, implement fallback logic or notify the user
  }
};
