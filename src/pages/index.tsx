import React, { useState, useEffect, useMemo } from "react";
import {
  useOpenAi,
  setStoredQuestions,
  generateInstructions,
  addQuestion,
  getStoredQuestions,
} from "../utils";
import { Spinner } from "@fluentui/react-components";

// Define a modern light color palette
const colors = {
  background: "#f5f5f5", // Light gray background
  card: "#ffffff", // White card background
  primary: "#ff6f61", // Coral for primary actions
  primaryHover: "#ff3b2e", // Darker coral on hover
  secondary: "#4a90e2", // Soft blue for accents
  textPrimary: "#333333", // Dark gray text
  textSecondary: "#777777", // Medium gray text
  border: "#e0e0e0", // Light border color
  buttonText: "#ffffff", // White text on buttons
  listBackground: "#fafafa", // Slightly off-white for lists
};

// Container style with modern layout and responsive design
const containerStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "20px",
  maxWidth: "500px",
  margin: "10px auto",
  padding: "30px",
  borderRadius: "12px",
  boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
  backgroundColor: colors.card,
  fontFamily: "'Helvetica Neue', Arial, sans-serif",
};

// Header style
const headerStyle: React.CSSProperties = {
  textAlign: "center",
  fontSize: "2em",
  color: colors.primary,
  marginBottom: "10px",
};

// Question box with enhanced styling
const questionBoxStyle: React.CSSProperties = {
  padding: "20px",
  backgroundColor: "#ffffff",
  borderRadius: "8px",
  minHeight: "80px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "18px",
  color: colors.textPrimary,
  border: `1px solid ${colors.border}`,
  transition: "box-shadow 0.3s ease",
};

// Button style with hover and active states
const buttonStyle: React.CSSProperties = {
  padding: "12px 24px",
  backgroundColor: colors.primary,
  color: colors.buttonText,
  border: "none",
  borderRadius: "8px",
  fontSize: "16px",
  cursor: "pointer",
  transition: "background-color 0.3s ease, transform 0.2s ease",
  alignSelf: "center",
};

// Disabled button style
const buttonDisabledStyle: React.CSSProperties = {
  ...buttonStyle,
  backgroundColor: "#cccccc",
  cursor: "not-allowed",
};

// List style for previously asked questions
const listStyle: React.CSSProperties = {
  maxHeight: "250px",
  overflowY: "auto",
  padding: "0",
  margin: "0",
  listStyleType: "none",
};

// Individual list item style
const listItemStyle: React.CSSProperties = {
  padding: "12px 16px",
  marginBottom: "10px",
  backgroundColor: colors.listBackground,
  borderRadius: "6px",
  boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
  fontSize: "16px",
  color: colors.textPrimary,
  transition: "background-color 0.3s ease, transform 0.2s ease",
};

// Custom Spinner Component
const SpinnerWrapper: React.FC = () => (
  <div style={spinnerContainerStyle}>
    <Spinner />
  </div>
);

// Spinner styles
const spinnerContainerStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "80px",
};

export default function Home() {
  // State for previously asked questions, initialized from localStorage
  const [previouslyAskedQuestions, setPreviouslyAskedQuestions] =
    useState<string[]>(getStoredQuestions());

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
        setPreviouslyAskedQuestions((prevQuestions) =>
          addQuestion(prevQuestions, newQuestion)
        );
      }
    } catch (error) {
      console.error("Error fetching new question:", error);
    }
  };

  return (
    <div
      style={{
        backgroundColor: colors.background,
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <div style={containerStyle}>
        {/* Header */}
        <h1 style={headerStyle}>Dinner Game</h1>

        {/* Display the current question or a spinner while loading */}
        {!isLoading ? (
          <div style={questionBoxStyle}>
            {data?.content || "No question available."}
          </div>
        ) : (
          <SpinnerWrapper />
        )}

        {/* Button to fetch a new question */}
        <button
          style={isLoading ? buttonDisabledStyle : buttonStyle}
          onClick={handleNewQuestion}
          disabled={isLoading}
          onMouseOver={(e) => {
            if (!isLoading) {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                colors.primaryHover;
            }
          }}
          onMouseOut={(e) => {
            if (!isLoading) {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                colors.primary;
            }
          }}
          onMouseDown={(e) => {
            if (!isLoading) {
              (e.currentTarget as HTMLButtonElement).style.transform =
                "scale(0.98)";
            }
          }}
          onMouseUp={(e) => {
            if (!isLoading) {
              (e.currentTarget as HTMLButtonElement).style.transform =
                "scale(1)";
            }
          }}
        >
          {isLoading ? "Loading..." : "New Question"}
        </button>

        {/* Display the list of previously asked questions */}
        {previouslyAskedQuestions.length > 0 && (
          <div>
            <h2 style={{ color: colors.textPrimary, marginBottom: "15px" }}>
              Previously Asked Questions:
            </h2>
            <ul style={listStyle}>
              {previouslyAskedQuestions.map((question, index) => (
                <li
                  key={index}
                  style={listItemStyle}
                  onMouseOver={(e) => {
                    (e.currentTarget as HTMLLIElement).style.backgroundColor =
                      "#e0f7fa";
                    (e.currentTarget as HTMLLIElement).style.transform =
                      "translateY(-2px)";
                  }}
                  onMouseOut={(e) => {
                    (e.currentTarget as HTMLLIElement).style.backgroundColor =
                      colors.listBackground;
                    (e.currentTarget as HTMLLIElement).style.transform =
                      "translateY(0)";
                  }}
                >
                  {question}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
