import { useEffect, useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import { Alert } from '../../shared/components/Alert'
import { BookForm } from './components/BookForm'
import { BookTable } from './components/BookTable'
import { BooksToolbar } from './components/BooksToolbar'
import { InventoryHeader } from './components/InventoryHeader'
import { emptyBookForm, getBookFormValues, getBookPayload, validateBookPayload } from './bookForm'
import { useBooks } from './hooks/useBooks'
import type { Book, BookFormValues } from './types'

export function BookInventoryPage() {
  const {
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
  } = useBooks()
  const [form, setForm] = useState<BookFormValues>(emptyBookForm)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [search, setSearch] = useState('')

  const filteredBooks = useMemo(() => {
    const query = search.trim().toLowerCase()

    if (!query) {
      return books
    }

    return books.filter((book) =>
      [book.title, book.author, book.isbn ?? ''].some((value) =>
        value.toLowerCase().includes(query),
      ),
    )
  }, [books, search])

  useEffect(() => {
    loadBooks()
  }, [loadBooks])

  function updateField(field: keyof BookFormValues, value: string) {
    setForm((current) => ({ ...current, [field]: value }))
  }

  function resetForm() {
    setForm(emptyBookForm)
    setEditingId(null)
    setError('')
  }

  function editBook(book: Book) {
    setEditingId(book.id)
    setForm(getBookFormValues(book))
    setNotice('')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  async function submitBook(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const payload = getBookPayload(form)
    const validationError = validateBookPayload(payload)

    if (validationError) {
      setError(validationError)
      return
    }

    const didSave = await saveBook(payload, editingId)

    if (didSave) {
      resetForm()
    }
  }

  function confirmDelete(book: Book) {
    const shouldDelete = window.confirm(`Delete "${book.title}"?`)

    if (shouldDelete) {
      removeBook(book)
    }
  }

  return (
    <main className="min-h-screen bg-[#f6f4ef] text-[#202124]">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-5 sm:px-6 lg:px-8">
        <InventoryHeader bookCount={books.length} inventoryValue={inventoryValue} lowStockCount={lowStockCount} />
        <Alert error={error} notice={notice} />

        <section className="grid gap-6 lg:grid-cols-[360px_1fr]">
          <BookForm
            editingId={editingId}
            form={form}
            isSaving={isSaving}
            onCancel={resetForm}
            onChange={updateField}
            onSubmit={submitBook}
          />

          <section className="min-w-0">
            <BooksToolbar onRefresh={loadBooks} onSearchChange={setSearch} search={search} />
            <div className="overflow-hidden border border-[#d8d4c9] bg-white">
              <BookTable books={filteredBooks} isLoading={isLoading} onDelete={confirmDelete} onEdit={editBook} />
            </div>
          </section>
        </section>
      </div>
    </main>
  )
}
