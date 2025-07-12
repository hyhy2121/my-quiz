import React from "react";
import type { Question } from "../../utils/types";
import s from "../quiz/Quiz.module.css";

interface QuestionCardProps {
  QuizData: Question[];
  currentQuestion: number;
  selectedAnswer: string | null;
  handleAnswerClick: (el: string) => void;
  handleNextClick: () => void;
}

export const QuestionCard = React.memo((props: QuestionCardProps) => {
  console.log("Render: QuestionCard");
  const {
    QuizData,
    currentQuestion,
    selectedAnswer,
    handleNextClick,
    handleAnswerClick,
  } = props;
  const question = QuizData[currentQuestion];

  return (
    <div key={question.id} className={s.question_card}>
      <div className={s.question_title}>{question.question}</div>
      <div className={s.question_wrapper_button}>
        {question.options.map((el, index) => {
          let classname = s.question_button;

          if (selectedAnswer) {
            if (el === question.correct) {
              classname += " " + s.correct;
            }
            if (el === selectedAnswer && el !== question.correct) {
              classname += " " + s.wrong;
            }
          }

          return (
            <button
              disabled={selectedAnswer !== null}
              key={index}
              onClick={() => handleAnswerClick(el)}
              className={classname}
            >
              {el}
            </button>
          );
        })}
      </div>
      <div className={s.question_footer}>
        {selectedAnswer && (
          <button onClick={handleNextClick} className={s.question_button}>
            Next
          </button>
        )}
      </div>
    </div>
  );
});
