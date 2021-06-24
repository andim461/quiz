import { makeAutoObservable } from "mobx";
import Statistic from "../interfaces/Statistics";
class StatisticStore {
  stats: Statistic = { easy: 0, medium: 0, hard: 0 };
  constructor() {
    makeAutoObservable(this);
  }
  incrementDifficult(diff: "easy" | "medium" | "hard") {
    this.stats[diff]++;
  }
  toInitial() {
    this.stats = { easy: 0, medium: 0, hard: 0 };
  }
}
export default new StatisticStore();
