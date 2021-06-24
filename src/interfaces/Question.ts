import Difficulty from "./Difficulty";
interface Question {
  category: string;
  correct_answer: string;
  difficulty: Difficulty;
  incorrect_answers: string[];
  question: string;
  type: string;
}
export default Question;
