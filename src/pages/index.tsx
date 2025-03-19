import React, { useState, useEffect, useMemo } from "react";
import {
  useOpenAi,
  generateInstructions,
  addQuestion,
  getStoredQuestions,
  setStoredQuestions,
} from "../utils";
import {
  Spinner,
  makeStyles,
  shorthands,
  tokens,
} from "@fluentui/react-components";

// Modern color palette
const customTokens = {
  background: "#f8f9fb",
  card: "#ffffff",
  primary: "#4361ee",
  primaryHover: "#3a56d4",
  secondary: "#f1f2f6",
  textPrimary: "#2d3748",
  textSecondary: "#718096",
  border: "#e2e8f0",
  buttonText: "#ffffff",
  accent: "#f687b3",
  accentLight: "#fed7e2",
};

const useStyles = makeStyles({
  page: {
    backgroundColor: customTokens.background,
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    maxWidth: "520px",
    width: "90%",
    ...shorthands.borderRadius("16px"),
    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.05)",
    backgroundColor: customTokens.card,
    ...shorthands.overflow("hidden"),
  },
  header: {
    backgroundColor: customTokens.primary,
    color: customTokens.buttonText,
    ...shorthands.padding("24px", "32px"),
    ...shorthands.margin("0"),
    fontSize: "1.75rem",
    fontWeight: "600",
    letterSpacing: "-0.025em",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    ...shorthands.gap("24px"),
    ...shorthands.padding("32px"),
  },
  questionBox: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    ...shorthands.padding("28px", "24px"),
    backgroundColor: customTokens.secondary,
    ...shorthands.borderRadius("12px"),
    minHeight: "90px",
    fontSize: "18px",
    lineHeight: "1.6",
    fontWeight: "500",
    color: customTokens.textPrimary,
    position: "relative",
    ...shorthands.border("1px", "solid", customTokens.border),
  },
  button: {
    ...shorthands.padding("14px", "28px"),
    backgroundColor: customTokens.primary,
    color: customTokens.buttonText,
    ...shorthands.border("none"),
    ...shorthands.borderRadius("8px"),
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    alignSelf: "center",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    marginTop: "8px",
    ":hover": {
      backgroundColor: customTokens.primaryHover,
      transform: "translateY(-2px)",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.12)",
    },
    ":active": {
      transform: "translateY(0)",
    },
  },
  buttonDisabled: {
    backgroundColor: customTokens.textSecondary,
    cursor: "not-allowed",
    opacity: 0.7,
    boxShadow: "none",
    ":hover": {
      backgroundColor: customTokens.textSecondary,
      transform: "none",
      boxShadow: "none",
    },
    ":active": {
      transform: "none",
    },
  },
  questionsSection: {
    display: "flex",
    flexDirection: "column",
    ...shorthands.gap("16px"),
    marginTop: "8px",
  },
  previousHeading: {
    fontSize: "1rem",
    fontWeight: "600",
    color: customTokens.textSecondary,
    ...shorthands.margin("0"),
    ...shorthands.padding("0", "4px"),
  },
  list: {
    display: "flex",
    flexDirection: "column",
    ...shorthands.gap("10px"),
    maxHeight: "240px",
    overflowY: "auto",
    ...shorthands.padding("4px", "2px"),
    ...shorthands.margin("0"),
    listStyleType: "none",
    "&::-webkit-scrollbar": {
      width: "6px",
    },
    "&::-webkit-scrollbar-track": {
      backgroundColor: "transparent",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: customTokens.border,
      ...shorthands.borderRadius("3px"),
    },
  },
  listItem: {
    ...shorthands.padding("16px", "20px"),
    backgroundColor: customTokens.secondary,
    ...shorthands.borderRadius("8px"),
    fontSize: "15px",
    color: customTokens.textPrimary,
    lineHeight: "1.5",
  },
  loadingBox: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: customTokens.secondary,
    ...shorthands.borderRadius("12px"),
    minHeight: "90px",
    position: "relative",
    ...shorthands.border("1px", "solid", customTokens.border),
  },

  spinnerContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  accent: {
    color: customTokens.accent,
  },
});

const botDescription =
  "You are a bot that generates interesting questions to learn more about the person you are talking to. Do not ask anything about historical figures and only ask the question.";

const SpinnerWrapper: React.FC = () => {
  const styles = useStyles();
  return (
    <div className={styles.spinnerContainer}>
      <Spinner size="medium" />
    </div>
  );
};

export default function Home() {
  const styles = useStyles();
  const [previouslyAskedQuestions, setPreviouslyAskedQuestions] =
    useState<string[]>(getStoredQuestions());
  const [isLoading, setIsLoading] = useState(false);

  const instructions = useMemo(
    () => generateInstructions(previouslyAskedQuestions),
    [previouslyAskedQuestions]
  );

  const { data, refetch } = useOpenAi(
    botDescription,
    instructions,
    previouslyAskedQuestions.length === 0
  );

  useEffect(() => {
    if (data?.content) {
      const currentQuestion = data.content;
      setPreviouslyAskedQuestions((prevQuestions) => {
        if (!prevQuestions.includes(currentQuestion)) {
          const newQuestions = [...prevQuestions, currentQuestion];
          setStoredQuestions(newQuestions);
          return newQuestions;
        }
        return prevQuestions;
      });
      setIsLoading(false);
    }
  }, [data?.content]);

  const handleNewQuestion = () => {
    setIsLoading(true);
    refetch();
  };

  const filteredQuestions = [...previouslyAskedQuestions]
    .slice(0, -1)
    .reverse();

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.header}>Dinner Game</h1>
        <div className={styles.content}>
          <div className={styles.questionBox}>
            {isLoading ? (
              <Spinner />
            ) : (
              data?.content || "Ready to start? Click 'New Question'"
            )}
          </div>

          <button
            className={
              isLoading
                ? `${styles.button} ${styles.buttonDisabled}`
                : styles.button
            }
            onClick={handleNewQuestion}
            disabled={isLoading}
          >
            {isLoading ? "Thinking..." : "New Question"}
          </button>
          {filteredQuestions.length > 0 && (
            <div className={styles.questionsSection}>
              <h2 className={styles.previousHeading}>Previous Questions</h2>
              <ul className={styles.list}>
                {filteredQuestions.map((question, index) => (
                  <li key={index} className={styles.listItem}>
                    {question}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
