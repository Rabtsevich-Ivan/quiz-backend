interface Question {
  title: string;
  isCorrect: boolean;
  timeSpent: number;
}

export interface Result {
  creator: string;
  name: string;
  date: string;
  numberOfQuestions: number;
  technologies: string[];
  evaluation: string;
  questions: Question[];
}
