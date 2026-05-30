import { useCallback, useMemo, useState } from 'react'
import { createBook, deleteBook, getBooks, updateBook } from '../api'
import type { Book, BookPayload } from '../types'

const API_CONNECTION_ERROR =
  'Could not connect to the book API. Make sure the Spring server is running on port 8080.'

export function useBooks() {
  const [books, setBooks] = useState<Book[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')

  const inventoryValue = useMemo(
    () => books.reduce((total, book) => total + Number(book.price) * Number(book.stock), 0),
    [books],
  )

  const lowStockCount = useMemo(
    () => books.filter((book) => Number(book.stock) <= 5).length,
    [books],
  )

  const loadBooks = useCallback(async () => {
    setIsLoading(true)
    setError('')

    try {
      setBooks(await getBooks())
    } catch {
      setError(API_CONNECTION_ERROR)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const saveBook = useCallback(async (payload: BookPayload, editingId: number | null) => {
    setIsSaving(true)
    setError('')
    setNotice('')

    try {
      const savedBook = editingId ? await updateBook(editingId, payload) : await createBook(payload)

      setBooks((currentBooks) =>
        editingId
          ? currentBooks.map((book) => (book.id === savedBook.id ? savedBook : book))
          : [savedBook, ...currentBooks],
      )
      setNotice(editingId ? 'Book updated.' : 'Book added.')
      return true
    } catch {
      setError('The book could not be saved. Check the backend logs for details.')
      return false
    } finally {
      setIsSaving(false)
    }
  }, [])

  const removeBook = useCallback(async (book: Book) => {
    setError('')
    setNotice('')

    try {
      await deleteBook(book.id)
      setBooks((currentBooks) => currentBooks.filter((currentBook) => currentBook.id !== book.id))
      setNotice('Book deleted.')
    } catch {
      setError('The book could not be deleted. It may have already been removed.')
    }
  }, [])

  return {
    books,
    error,
    inventoryValue,
    isLoading,
    isSaving,
    loadBooks,
    lowStockCount,
    notice,
    removeBook,
    saveBook,
    setError,
    setNotice,
  }
}
