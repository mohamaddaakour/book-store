import type { Book, BookPayload } from './types'

const BOOKS_API_URL = '/api/books'

async function parseJsonResponse<T>(response: Response, fallbackMessage: string): Promise<T> {
  if (!response.ok) {
    throw new Error(fallbackMessage)
  }

  return response.json() as Promise<T>
}

export async function getBooks() {
  const response = await fetch(BOOKS_API_URL)
  return parseJsonResponse<Book[]>(response, 'Could not load books')
}

export async function createBook(payload: BookPayload) {
  const response = await fetch(BOOKS_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })

  return parseJsonResponse<Book>(response, 'Could not create book')
}

export async function updateBook(id: number, payload: BookPayload) {
  const response = await fetch(`${BOOKS_API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })

  return parseJsonResponse<Book>(response, 'Could not update book')
}

export async function deleteBook(id: number) {
  const response = await fetch(`${BOOKS_API_URL}/${id}`, {
    method: 'DELETE',
  })

  if (!response.ok) {
    throw new Error('Could not delete book')
  }
}
