import { Table } from "@tanstack/react-table"
import { Input } from "@/components/ui/input"

interface FiltersProps<TData> {
  table: Table<TData>
  columnId?: string
  placeholder?: string
}

export function Filters<TData>({ 
  table, 
  columnId = "email",
  placeholder = "Filtrar..."
}: FiltersProps<TData>) {
  return (
    <Input
      placeholder={placeholder}
      value={(table.getColumn(columnId)?.getFilterValue() as string) ?? ""}
      onChange={(event) =>
        table.getColumn(columnId)?.setFilterValue(event.target.value)
      }
      className="max-w-sm"
    />
  )
}