export type ChoiceType = {
  choice: string;
  votes: number;
};
export type QuestionType = {
  id: number;
  image_url: string;
  thumb_url: string;
  published_at: string;
  question: string;
  choices: ChoiceType[];
};
