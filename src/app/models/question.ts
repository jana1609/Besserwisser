export interface Question {
  id: number;
  categoryId: number;
  text: string;
  answers: object;
  correct: string;
}

export interface QuestionDTO {
  id: number;
  categoryId: number;
  text: string;
  answers: string;
  correct: string;
}
