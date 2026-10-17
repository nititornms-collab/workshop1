// Assignment 4.1: Student Tracker
export class Student {
  name: string;
  id: number;
  scores: number[];

  constructor(name: string, id: number, scores: number[] = []) {
    this.name = name;
    this.id = id;
    this.scores = [...scores];
  }

  addScore(score: number): void {
    this.scores.push(score);
  }

  getAverage(): number {
    if (this.scores.length === 0) {
      return 0;
    }

    const total = this.scores.reduce((sum, score) => sum + score, 0);
    return total / this.scores.length;
  }
}
