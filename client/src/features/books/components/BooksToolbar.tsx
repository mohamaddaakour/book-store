type BooksToolbarProps = {
  onRefresh: () => void
  onSearchChange: (value: string) => void
  search: string
}

export function BooksToolbar({ onRefresh, onSearchChange, search }: BooksToolbarProps) {
  return (
    <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <h2 className="text-xl font-bold">Books</h2>
      <div className="flex gap-2">
        <input
          className="w-full min-w-0 border border-[#c9c4b8] bg-white px-3 py-2 outline-none focus:border-[#1f6f78] focus:ring-2 focus:ring-[#1f6f78]/20 sm:w-72"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search title, author, ISBN"
        />
        <button
          className="border border-[#c9c4b8] bg-white px-4 py-2 font-semibold hover:bg-[#f6f4ef]"
          type="button"
          onClick={onRefresh}
        >
          Refresh
        </button>
      </div>
    </div>
  )
}
