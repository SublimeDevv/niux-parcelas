
"use client";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, Eye, Pencil, Trash2, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {  InternalPlot } from "@/modules/plots/models/plot";

interface ColumnsOptions {
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}


export const columns = ({ onEdit, onDelete }: ColumnsOptions): ColumnDef<InternalPlot>[] => [
{
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate") as "indeterminate"
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
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "temperature",
    header: "Temperature",
  },
  {
    accessorKey: "unit",
    header: "Unit",
  },
  {
    accessorKey: "latitude",
    header: "Latitude",
  },
  {
    accessorKey: "longitude",
    header: "Longitude",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "manager",
    header: "Manager",
  },
  {
    id: "actions",
    header: "Acciones",
    cell: ({ row }) => {
      const plot = row.original;
      const handleView = () => {
        console.log("Ver parcela:", plot.id);
      };

      const handleEdit = () => onEdit(plot.id);

       const handleDelete = () => onDelete(plot.id);


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
            <DropdownMenuItem
              onClick={handleView}
              className="flex items-center gap-2"
            >
              <Eye className="h-4 w-4" />
              <span>Ver detalles</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={handleEdit}
              className="flex items-center gap-2"
            >
              <Pencil className="h-4 w-4" />
              <span>Editar</span>
            </DropdownMenuItem>
        {/*     <DropdownMenuItem
              onClick={handleEdit}
              className="flex items-center gap-2"
            >
              <UserPlus className="h-4 w-4" />
              <span>Asignar responsable</span>
            </DropdownMenuItem> */}
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
      );
    },
  },
];
