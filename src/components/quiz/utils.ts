import type { Question } from "../../utils/types";

export const initialState: InitialValue = {
  currentQuestion: 0,
  selectedAnswer: null,
  score: 0,
  isFinished: false,
  question: [],
};
export type InitialValue = {
  currentQuestion: number;
  selectedAnswer: string | null;
  score: number;
  isFinished: boolean;
  question: Question[];
};

export type Action =
  | { type: "SELECT_ANSWER"; payload: string }
  | { type: "NEXT_QUESTION" }
  | { type: "RESTART_QUIZ" }
  | { type: "SET_QUESTIONS"; payload: Question[] };

export const reducer = (state: InitialValue, action: Action): InitialValue => {
  switch (action.type) {
    case "SET_QUESTIONS": {
      return {
        ...state,
        question: action.payload,
        currentQuestion: 0,
        score: 0,
        selectedAnswer: null,
        isFinished: false,
      };
    }
    case "SELECT_ANSWER": {
      const isCorrect =
        state.question[state.currentQuestion].correct === action.payload;
      return {
        ...state,
        selectedAnswer: action.payload,
        score: isCorrect ? state.score + 1 : state.score,
      };
    }
    case "NEXT_QUESTION": {
      const isLast = state.currentQuestion + 1 >= state.question.length;
      return {
        ...state,
        currentQuestion: isLast
          ? state.currentQuestion
          : state.currentQuestion + 1,
        selectedAnswer: null,
        isFinished: isLast,
      };
    }
    case "RESTART_QUIZ":
      return {
        ...initialState,
        question: state.question,
      };
    default:
      return state;
  }
};
