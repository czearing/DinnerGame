import React, { useState, useEffect, useMemo } from "react";
import {
  useOpenAi,
  setStoredQuestions,
  generateInstructions,
  addQuestion,
  getStoredQuestions,
} from "../utils";
import { Button, Spinner } from "@fluentui/react-components";

const containerStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "15px",
  maxWidth: "400px",
  margin: "50px auto",
  padding: "20px",
  border: "1px solid #ccc",
  borderRadius: "8px",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  backgroundColor: "#fff",
};

const questionBoxStyle: React.CSSProperties = {
  padding: "15px",
  backgroundColor: "#f0f0f0",
  borderRadius: "4px",
  minHeight: "60px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "16px",
};

const listStyle: React.CSSProperties = {
  maxHeight: "200px",
  overflowY: "auto",
  paddingLeft: "20px",
  margin: 0,
};

const listItemStyle: React.CSSProperties = {
  marginBottom: "8px",
  fontSize: "14px",
};

export default function Home() {
  // State for previously asked questions, initialized from localStorage
  const [previouslyAskedQuestions, setPreviouslyAskedQuestions] =
    useState(getStoredQuestions);

  // Base bot description
  const botDescription =
    "You are a bot that generates interesting questions to learn more about the person you are talking to. Do not ask anything about historical figures and only ask the question.";

  // Memoized instructions for the OpenAI API
  const instructions = useMemo(
    () => generateInstructions(previouslyAskedQuestions),
    [previouslyAskedQuestions]
  );

  // Fetch data using the useOpenAi hook with memoized instructions
  const { data, isLoading, refetch } = useOpenAi(botDescription, instructions);

  // Persist the previouslyAskedQuestions to localStorage whenever it changes
  useEffect(() => {
    setStoredQuestions(previouslyAskedQuestions);
  }, [previouslyAskedQuestions]);

  /**
   * Handles fetching a new question and updating the state accordingly.
   */
  const handleNewQuestion = async () => {
    try {
      const response = await refetch(); // Assuming refetch returns a promise
      const newQuestion = response?.data?.content;

      if (newQuestion) {
        setPreviouslyAskedQuestions((prevQuestions: any) =>
          addQuestion(prevQuestions, newQuestion)
        );
      }
    } catch (error) {
      console.error("Error fetching new question:", error);
    }
  };

  return (
    <div style={containerStyle}>
      {/* Display the current question or a spinner while loading */}
      {!isLoading ? (
        <div style={questionBoxStyle}>{data?.content}</div>
      ) : (
        <Spinner label="Loading question..." />
      )}

      {/* Button to fetch a new question */}
      <Button
        appearance="primary"
        onClick={handleNewQuestion}
        disabled={isLoading}
      >
        {isLoading ? "Loading..." : "New Question"}
      </Button>

      {/* Display the list of previously asked questions */}
      {previouslyAskedQuestions.length > 0 && (
        <div>
          <h3>Previously Asked Questions:</h3>
          <ul style={listStyle}>
            {previouslyAskedQuestions.map((question: any, index: number) => (
              <li key={index} style={listItemStyle}>
                {question}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
