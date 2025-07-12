import React from "react";
import type { Question } from "../../utils/types";
import s from "../quiz/Quiz.module.css";

interface ResultProps {
  score: number;
  QuizData: Question[];
  handleRestartClick: () => void;
}

export const Result = React.memo((props: ResultProps) => {
  console.log("Render: Result");
  const { score, QuizData, handleRestartClick } = props;

  return (
    <div className={s.question_result_modal}>
      <div className={s.question_result}>
        Your result: {score} of {QuizData.length}
      </div>
      <button onClick={handleRestartClick} className={s.question_button}>
        Start again
      </button>
    </div>
  );
});
