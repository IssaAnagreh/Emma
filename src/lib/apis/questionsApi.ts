import {request} from ".";

export const fetchQuestions = () => request.get(`/questions`);

export const submitAnswers = (
  answers: {answer: string | number; questionId: string | number}[],
) => request.post(`/answers`, {answers});
