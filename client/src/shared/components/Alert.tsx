type AlertProps = {
  error: string
  notice: string
}

export function Alert({ error, notice }: AlertProps) {
  if (!error && !notice) {
    return null
  }

  return (
    <div
      className={`border px-4 py-3 text-sm font-medium ${
        error
          ? 'border-[#e2a3a3] bg-[#fff0f0] text-[#8a2424]'
          : 'border-[#a4c6a9] bg-[#eef8ef] text-[#265f31]'
      }`}
    >
      {error || notice}
    </div>
  )
}
