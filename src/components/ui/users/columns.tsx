"use client"
import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal, Eye, Pencil, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
//cambiar con el tipado de los modelos que se usaran
export type User = {
  id: string
  name: string
  email: string
  rol: "user" | "admin"
  status: "active" | "inactive"
  createdAt: string
}

export const columns: ColumnDef<User>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate") as 'indeterminate' | true
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: "actions",
    header: "Acciones",
    cell: ({ row }) => {
      const user = row.original
      
      const handleView = () => {
        // Implementar lógica para ver detalles del usuario
        console.log('Ver usuario:', user.id);
      };

      const handleEdit = () => {
        // Implementar lógica para editar usuario
        console.log('Editar usuario:', user.id);
      };

      const handleDelete = () => {
        // Implementar lógica para eliminar usuario
        if (confirm(`¿Estás seguro de eliminar al usuario ${user.name}?`)) {
          console.log('Eliminar usuario:', user.id);
        }
      };

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Abrir menú</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Acciones</DropdownMenuLabel>
            <DropdownMenuItem onClick={handleView} className="flex items-center gap-2">
              <Eye className="h-4 w-4" />
              <span>Ver detalles</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleEdit} className="flex items-center gap-2">
              <Pencil className="h-4 w-4" />
              <span>Editar</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              onClick={handleDelete}
              className="flex items-center gap-2"
            >
              <Trash2 className="h-4 w-4 text-red-400 " />
              <span className="text-red-400 ">Eliminar</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
  {
    accessorKey: "name",
    header: "Nombre",
  },
  {
    accessorKey: "rol",
    header: "Rol",
  },
  {
    accessorKey: "email",
    header: "Email",
  },

  {
    accessorKey: "status",
    header: "Estado",
    cell: ({ row }) => {
      const status = row.original.status;
      return (
        <span className={`px-2 py-1 rounded-full text-xs ${
          status === 'active' 
            ? 'bg-green-800/40 text-green-500' 
            : 'bg-red-800/40 text-red-500'
        }`}>
          {status === 'active' ? 'Activo' : 'Inactivo'}
        </span>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Fecha de creación",
 
  },
];