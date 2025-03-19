import { MAX_QUESTIONS } from "./question.constants";
import { summarizeQuestion } from "src/server";

const summarizeQuestionBotDescription = `You are an assistant specialized in summarizing questions. For each provided question, extract and provide three descriptive keywords that capture its main topics, separated by commas. Example: Input: "What is the most valuable life lesson you've learned from a personal experience?" Output: life lessons, personal experience, valuable insights`;

/**
 * Adds a new question to the list, ensuring no duplicates and enforcing a maximum cap.
 * @param currentQuestions - Current list of questions.
 * @param  newQuestion - The new question to add.
 * @returns  Updated list of questions.
 */
export const addQuestion = async (
  currentQuestions: string[],
  newQuestion: string
) => {
  if (currentQuestions.includes(newQuestion)) {
    return currentQuestions;
  }

  const summarizedQuestion = await summarizeQuestion(
    summarizeQuestionBotDescription,
    newQuestion
  );
  console.log(summarizedQuestion?.content);

  const updatedQuestions = [newQuestion, ...currentQuestions];

  if (updatedQuestions.length > MAX_QUESTIONS) {
    return updatedQuestions.slice(updatedQuestions.length - MAX_QUESTIONS);
  }

  return updatedQuestions;
};
