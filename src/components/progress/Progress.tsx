import React, { useMemo } from "react";
import type { Question } from "../../utils/types";
import s from "../quiz/Quiz.module.css";

interface ProgressProps {
  currentQuestion: number;
  QuizData: Question[];
}

export const Progress = React.memo((props: ProgressProps) => {
  console.log("Render: Progress");
  const { currentQuestion, QuizData } = props;

  const progressPercentage = useMemo(() => {
    return ((currentQuestion + 1) / QuizData.length) * 100;
  }, [currentQuestion, QuizData.length]);

  return (
    <div className={s.progress}>
      Question {currentQuestion + 1} of {QuizData.length}
      <div className={s.progress_bar}>
        <div
          className={s.progress_fill}
          style={{
            width: `${progressPercentage}%`,
          }}
        ></div>
      </div>
    </div>
  );
});
