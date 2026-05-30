export type Book = {
  id: number
  title: string
  author: string
  isbn?: string | null
  price: number
  stock: number
}

export type BookPayload = {
  title: string
  author: string
  price: number
  stock: number
}

export type BookFormValues = {
  title: string
  author: string
  price: string
  stock: string
}
