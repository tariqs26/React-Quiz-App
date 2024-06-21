export type Page = "home" | "quiz" | "error" | "results"

export type Question = {
  category: string
  correct_answer: string
  difficulty: "easy" | "medium" | "hard"
  incorrect_answers: string[]
  question: string
  type: "multiple" | "boolean"
}
