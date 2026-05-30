import type { Book, BookFormValues, BookPayload } from './types'

export const emptyBookForm: BookFormValues = {
  title: '',
  author: '',
  price: '',
  stock: '',
}

export function getBookFormValues(book: Book): BookFormValues {
  return {
    title: book.title,
    author: book.author,
    price: String(book.price),
    stock: String(book.stock),
  }
}

export function getBookPayload(form: BookFormValues): BookPayload {
  return {
    title: form.title.trim(),
    author: form.author.trim(),
    price: Number(form.price),
    stock: Number(form.stock),
  }
}

export function validateBookPayload(payload: BookPayload) {
  if (!payload.title || !payload.author || Number.isNaN(payload.price) || Number.isNaN(payload.stock)) {
    return 'Fill in title, author, price, and stock before saving.'
  }

  if (payload.price < 0 || payload.stock < 0) {
    return 'Price and stock must be non-negative.'
  }

  return ''
}
