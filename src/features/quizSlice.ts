import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Question } from 'hooks/useQuestionsFetch';

interface QuizQuestion extends Question {
  picked: string;
  options: string[];
}

export type QuizState = {
  questions: QuizQuestion[];
  currentIndex: number;
  isLoading: boolean;
  progress: number;
  revealAnswers: boolean;
  submit: boolean;
  score: number;
};

const initialState: QuizState = {
  questions: [],
  currentIndex: 0,
  isLoading: true,
  progress: 0,
  revealAnswers: false,
  submit: false,
  score: 0,
};

const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    setQuestions(state, { payload }: PayloadAction<QuizQuestion[]>) {
      state.questions = payload;
    },
    setIsLoading(state, { payload }: PayloadAction<boolean>) {
      state.isLoading = payload;
    },
    nextQuestion(state) {
      state.currentIndex++;
    },
    submit(state) {
      state.submit = true;
    },
    incrementScore(state, { payload }: PayloadAction<number>) {
      state.score += payload;
    },
    clearQuiz() {
      return initialState;
    },
    pickAnswer(
      state,
      { payload }: PayloadAction<{ question: string; answer: string }>
    ) {
      const questionIndex = state.questions.findIndex(
        ({ question: q }) => q === payload.question
      );
      const question = state.questions[questionIndex];
      if (question.picked) return;
      question.picked = payload.answer;
    },
  },
  extraReducers: {},
});

export const {
  setQuestions,
  setIsLoading,
  submit,
  nextQuestion,
  incrementScore,
  clearQuiz,
  pickAnswer,
} = quizSlice.actions;

export default quizSlice.reducer;
