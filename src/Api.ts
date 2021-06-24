import { shuffle } from "lodash";
import Question from "./interfaces/Question";
import Difficulty from "./interfaces/Difficulty";
import QuestionAnswer from "./interfaces/QuestionAnswer";

export const fetchQuestions = async (difficulty: Difficulty, num: number) => {
  const res = await fetch(
    `https://opentdb.com/api.php?amount=${num}&difficulty=${difficulty}`
  );
  const data = await res.json();
  return data.results.map(
    (question: Question): QuestionAnswer => ({
      ...question,
      answers: shuffle([
        ...question.incorrect_answers,
        question.correct_answer,
      ]),
    })
  );
};
export const getAllQuestions = async () => {
  const NUMS_PER_DIFFICULTY = 5;
  const questions = [];
  for (const diff of Object.values(Difficulty)) {
    const diffsQuestions = await fetchQuestions(diff, NUMS_PER_DIFFICULTY);
    questions.push(...diffsQuestions);
  }
  return questions;
};
