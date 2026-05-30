import { formatCurrency } from '../../../shared/utils/formatCurrency'
import type { Book } from '../types'

type BookTableProps = {
  books: Book[]
  isLoading: boolean
  onDelete: (book: Book) => void
  onEdit: (book: Book) => void
}

export function BookTable({ books, isLoading, onDelete, onEdit }: BookTableProps) {
  if (isLoading) {
    return <TableMessage>Loading books...</TableMessage>
  }

  if (books.length === 0) {
    return <TableMessage>No books found.</TableMessage>
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-full border-collapse text-left">
        <thead className="bg-[#ece8dd] text-xs uppercase text-[#555]">
          <tr>
            <th className="px-4 py-3 font-bold">Title</th>
            <th className="px-4 py-3 font-bold">Author</th>
            <th className="px-4 py-3 font-bold">Price</th>
            <th className="px-4 py-3 font-bold">Stock</th>
            <th className="px-4 py-3 font-bold">Status</th>
            <th className="px-4 py-3 text-right font-bold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <BookTableRow book={book} key={book.id} onDelete={onDelete} onEdit={onEdit} />
          ))}
        </tbody>
      </table>
    </div>
  )
}

function BookTableRow({ book, onDelete, onEdit }: Omit<BookTableProps, 'books' | 'isLoading'> & { book: Book }) {
  return (
    <tr className="border-t border-[#e4e0d5]">
      <td className="px-4 py-4">
        <p className="font-bold text-[#141414]">{book.title}</p>
        <p className="mt-1 text-xs text-[#667085]">ID {book.id}</p>
      </td>
      <td className="px-4 py-4 text-[#3d3d3d]">{book.author}</td>
      <td className="px-4 py-4 font-semibold">{formatCurrency(Number(book.price))}</td>
      <td className="px-4 py-4 font-semibold">{book.stock}</td>
      <td className="px-4 py-4">
        <StockBadge stock={Number(book.stock)} />
      </td>
      <td className="px-4 py-4">
        <div className="flex justify-end gap-2">
          <button
            className="border border-[#c9c4b8] px-3 py-2 text-sm font-semibold hover:bg-[#f6f4ef]"
            type="button"
            onClick={() => onEdit(book)}
          >
            Edit
          </button>
          <button
            className="border border-[#d69797] px-3 py-2 text-sm font-semibold text-[#8a2424] hover:bg-[#fff0f0]"
            type="button"
            onClick={() => onDelete(book)}
          >
            Delete
          </button>
        </div>
      </td>
    </tr>
  )
}

function StockBadge({ stock }: { stock: number }) {
  const status =
    stock <= 0
      ? { label: 'Out', className: 'border-[#d69797] bg-[#fff0f0] text-[#8a2424]' }
      : stock <= 5
        ? { label: 'Low', className: 'border-[#d7bd75] bg-[#fff8df] text-[#6c4d00]' }
        : { label: 'Available', className: 'border-[#9fc7a4] bg-[#eef8ef] text-[#265f31]' }

  return (
    <span className={`inline-flex min-w-24 justify-center border px-2 py-1 text-xs font-bold ${status.className}`}>
      {status.label}
    </span>
  )
}

function TableMessage({ children }: { children: string }) {
  return <div className="px-5 py-12 text-center font-semibold text-[#667085]">{children}</div>
}
