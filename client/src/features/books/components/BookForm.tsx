import type { BookFormValues } from '../types'
import type { SubmitEvent } from 'react';

type BookFormProps = {
  editingId: number | null
  form: BookFormValues
  isSaving: boolean
  onCancel: () => void
  onChange: (field: keyof BookFormValues, value: string) => void
  onSubmit: (event: SubmitEvent<HTMLFormElement>) => void
}

export function BookForm({ editingId, form, isSaving, onCancel, onChange, onSubmit }: BookFormProps) {
  return (
    <form className="border border-[#d8d4c9] bg-white p-5" onSubmit={onSubmit}>
      <div className="mb-5 flex items-center justify-between gap-3">
        <h2 className="text-xl font-bold">{editingId ? 'Edit Book' : 'Add Book'}</h2>
        {editingId && (
          <button
            className="border border-[#c9c4b8] px-3 py-2 text-sm font-semibold hover:bg-[#f6f4ef]"
            type="button"
            onClick={onCancel}
          >
            Cancel
          </button>
        )}
      </div>

      <label className="mb-4 block">
        <span className="mb-1 block text-sm font-semibold text-[#3d3d3d]">Title</span>
        <input
          className="w-full border border-[#c9c4b8] px-3 py-2 outline-none focus:border-[#1f6f78] focus:ring-2 focus:ring-[#1f6f78]/20"
          value={form.title}
          onChange={(event) => onChange('title', event.target.value)}
          placeholder="Clean Code"
        />
      </label>

      <label className="mb-4 block">
        <span className="mb-1 block text-sm font-semibold text-[#3d3d3d]">Author</span>
        <input
          className="w-full border border-[#c9c4b8] px-3 py-2 outline-none focus:border-[#1f6f78] focus:ring-2 focus:ring-[#1f6f78]/20"
          value={form.author}
          onChange={(event) => onChange('author', event.target.value)}
          placeholder="Robert C. Martin"
        />
      </label>

      <div className="grid grid-cols-2 gap-3">
        <label className="mb-4 block">
          <span className="mb-1 block text-sm font-semibold text-[#3d3d3d]">Price</span>
          <input
            className="w-full border border-[#c9c4b8] px-3 py-2 outline-none focus:border-[#1f6f78] focus:ring-2 focus:ring-[#1f6f78]/20"
            min="0"
            step="0.01"
            type="number"
            value={form.price}
            onChange={(event) => onChange('price', event.target.value)}
            placeholder="39.99"
          />
        </label>

        <label className="mb-4 block">
          <span className="mb-1 block text-sm font-semibold text-[#3d3d3d]">Stock</span>
          <input
            className="w-full border border-[#c9c4b8] px-3 py-2 outline-none focus:border-[#1f6f78] focus:ring-2 focus:ring-[#1f6f78]/20"
            min="0"
            step="1"
            type="number"
            value={form.stock}
            onChange={(event) => onChange('stock', event.target.value)}
            placeholder="12"
          />
        </label>
      </div>

      <button
        className="w-full bg-[#1f6f78] px-4 py-3 font-bold text-white hover:bg-[#185a61] disabled:cursor-not-allowed disabled:bg-[#91b8bd]"
        disabled={isSaving}
        type="submit"
      >
        {isSaving ? 'Saving...' : editingId ? 'Update Book' : 'Create Book'}
      </button>
    </form>
  )
}
