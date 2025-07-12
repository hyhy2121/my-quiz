import { useCallback, useEffect, useMemo, useReducer, useState } from "react";
import { initialState, reducer } from "./utils";
import { Progress } from "../progress/Progress";
import { Result } from "../result/Result";
import { QuestionCard } from "../question/QuestionCard";
import { useDebouncedLocalStorage } from "../../utils/useDebouncedLocalStorage";
import { fetchTriviaQuestion } from "../../utils/api";

const LOCAL_STORAGE_KEY = "quizState";
const DEBOUNCE_DELAY = 500;

export const Quiz = () => {
  const [loading, setLoading] = useState(true);

  const getInitialState = () => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (error) {
      console.log("Warn", error);
    }
    return initialState;
  };

  const memoizedInitialState = useMemo(() => getInitialState(), []);
  const [state, dispatch] = useReducer(
    reducer,
    undefined,
    () => memoizedInitialState
  );
  const { currentQuestion, selectedAnswer, score, isFinished } = state;

  useDebouncedLocalStorage(LOCAL_STORAGE_KEY, state, DEBOUNCE_DELAY);

  useEffect(() => {
    async function loadQuestion() {
      setLoading(true);
      try {
        const question = await fetchTriviaQuestion(10);
        dispatch({ type: "SET_QUESTIONS", payload: question });
      } catch (error) {
        console.error("Ошибка загрузки вопросов", error);
      } finally {
        setLoading(false);
      }
    }
    loadQuestion();
  }, []);

  const handleAnswerClick = useCallback(
    (selectedOption: string) => {
      dispatch({ type: "SELECT_ANSWER", payload: selectedOption });
    },
    [dispatch]
  );

  const handleNextClick = useCallback(() => {
    dispatch({ type: "NEXT_QUESTION" });
  }, [dispatch]);

  const handleRestartClick = useCallback(() => {
    dispatch({ type: "RESTART_QUIZ" });
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  }, [dispatch]);

  if (loading) {
    return <div>Loading questions...</div>;
  }
  if (state.question.length === 0) {
    return <div>No questions to display</div>;
  }
  if (currentQuestion >= state.question.length) {
    return <div>Question not found</div>;
  }

  return (
    <div key={currentQuestion}>
      <Progress currentQuestion={currentQuestion} QuizData={state.question} />
      {isFinished ? (
        <Result
          score={score}
          QuizData={state.question}
          handleRestartClick={handleRestartClick}
        />
      ) : (
        <QuestionCard
          QuizData={state.question}
          currentQuestion={currentQuestion}
          handleAnswerClick={handleAnswerClick}
          handleNextClick={handleNextClick}
          selectedAnswer={selectedAnswer}
        />
      )}
    </div>
  );
};
