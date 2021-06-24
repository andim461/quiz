import { makeAutoObservable } from "mobx";
import QuestionAnswer from "../interfaces/QuestionAnswer";
class QuestionsStore {
  questions: QuestionAnswer[] = [];
  currentIndex = 0;
  maxIndex = Infinity;
  currentAnswer: string | null = null;
  constructor() {
    makeAutoObservable(this);
    this.incrementIndex = this.incrementIndex.bind(this);
  }
  setQuestions(questions: QuestionAnswer[]) {
    this.questions = questions;
  }
  incrementIndex() {
    if (this.currentIndex !== this.maxIndex) {
      this.currentIndex++;
    }
    this.currentAnswer = null;
  }

  setMaxIndex(max: number) {
    this.maxIndex = max;
  }
  toInitial() {
    this.questions = [];
    this.currentIndex = 0;
    this.maxIndex = Infinity;
    this.currentAnswer = null;
  }
  setAnswer(answer: string) {
    this.currentAnswer = answer;
  }
  getCurrentQuestion() {
    return this.questions[this.currentIndex];
  }
}
export default new QuestionsStore();
