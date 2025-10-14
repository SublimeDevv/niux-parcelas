"use client";
import { useState } from "react";
import { DataTable } from "@/components/ui/data-table";
import { Separator } from "@/components/ui/separator";
import { Filters } from "@/components/ui/filters";
import { columns } from "./columns";
import { RoleModal } from "./role-modal";
import { Heading } from "@/components/ui/heading";
import { InternalRole } from "../interfaces";
import { RoleEditModal } from "./role-edit-modal";
import { ConfirmDeleteModal } from "./confirm-delete-modal";

interface RoleClientProps {
  data: InternalRole[];
}

export const RoleClient: React.FC<RoleClientProps> = ({ data }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedRoleId, setSelectedRoleId] = useState<string | null>(null);
  const [selectedDeleteRoleId, setSelectedDeleteRoleId] = useState<string | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleSuccess = () => {
    setIsModalOpen(false);
    setIsEditModalOpen(false);
  };

  const handleEdit = (id: string) => {
    setSelectedRoleId(id);
    setIsEditModalOpen(true);
  };

  const handleDelete = (id: string) => {
    setSelectedDeleteRoleId(id);
    setIsDeleteModalOpen(true);
  };

  const roleColumns = columns({ onEdit: handleEdit, onDelete: handleDelete });

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Roles (${data.length})`}
          description="Gestiona los roles del sistema"
          onAddNew={() => setIsModalOpen(true)}
        />
      </div>
      
      <Separator />
      
      <DataTable
        columns={roleColumns}
        data={data}
        Filters={({ table }) => (
          <Filters<InternalRole>
            table={table}
            columnId="name"
            placeholder="Filtrar por nombre..."
          />
        )}
      />

      <RoleModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleSuccess}
      />

      <ConfirmDeleteModal
        open={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        roleId={selectedDeleteRoleId}
      />

      <RoleEditModal
        open={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        roleId={selectedRoleId}
        onSuccess={handleSuccess}
      />
    </>
  );
};
