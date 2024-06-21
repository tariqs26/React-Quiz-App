import type { Question } from "."

export type QuizQuestion = Omit<Question, "incorrect_answers"> & {
  picked: string
  score: number
  options: string[]
}

type Timer = {
  status: "paused" | "running" | "completed"
  elapsedTime: number
  elapsedDelay: number
}

export type QuizState = {
  questions: QuizQuestion[]
  currentIndex: number
  timer: Timer
}
