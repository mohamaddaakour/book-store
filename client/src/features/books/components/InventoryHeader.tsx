import { formatCurrency } from '../../../shared/utils/formatCurrency'

type InventoryHeaderProps = {
  bookCount: number
  inventoryValue: number
  lowStockCount: number
}

export function InventoryHeader({ bookCount, inventoryValue, lowStockCount }: InventoryHeaderProps) {
  return (
    <header className="flex flex-col gap-4 border-b border-[#d8d4c9] pb-5 lg:flex-row lg:items-end lg:justify-between">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#667085]">Book Store</p>
        <h1 className="mt-2 text-3xl font-bold text-[#141414] sm:text-4xl">Inventory Manager</h1>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <MetricCard label="Books" value={String(bookCount)} />
        <MetricCard label="Low" value={String(lowStockCount)} />
        <MetricCard label="Value" value={formatCurrency(inventoryValue)} wide />
      </div>
    </header>
  )
}

function MetricCard({ label, value, wide = false }: { label: string; value: string; wide?: boolean }) {
  return (
    <div className={`border border-[#d8d4c9] bg-white px-4 py-3 ${wide ? 'min-w-32' : 'min-w-24'}`}>
      <p className="text-xs font-semibold uppercase text-[#667085]">{label}</p>
      <p className={`mt-1 font-bold ${wide ? 'text-xl' : 'text-2xl'}`}>{value}</p>
    </div>
  )
}
