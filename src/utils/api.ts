import type { Question } from "./types";

export const fetchTriviaQuestion = async (amount = 10): Promise<Question[]> => {
  const url = `https://the-trivia-api.com/api/questions?limit=${amount}&type=multiple`;

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("Не удалось загрузить вопросы");
  }

  const data = await res.json();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return data.map((item: any, index: number) => {
    const options = [...item.incorrectAnswers, item.correctAnswer].sort(
      () => Math.random() - 0.5
    );

    return {
      id: Date.now() + index,
      question: item.question,
      options,
      correct: item.correctAnswer,
    };
  });
};
