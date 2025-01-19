import axios from "axios";

export const fetchQuestions = async () => {
  const response = await axios.get("https://opentdb.com/api.php?amount=15");
  return response.data.results.map((q) => ({
    question: q.question,
    options: [...q.incorrect_answers, q.correct_answer].sort(() => Math.random() - 0.5),
    correctAnswer: q.correct_answer,
  }));
};
