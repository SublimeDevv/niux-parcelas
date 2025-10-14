"use client";
import { useState } from "react";
import { DataTable } from "@/components/ui/data-table";
import { Separator } from "@/components/ui/separator";
import { Filters } from "@/components/ui/filters";
import { columns } from "./columns";
import { UserModal } from "./user-modal";
import { Heading } from "@/components/ui/heading";
import { InternalUser } from "../interfaces";
import { UserEditModal } from "./user-edit-modal";
import { UserViewModal } from "./user-view-modal";
import { ConfirmDeleteModal } from "./confirm-delete-modal";
import { useRoles } from "@/modules/roles/hooks/useRoles";

interface UserClientProps {
  data: InternalUser[];
}

export const UserClient: React.FC<UserClientProps> = ({ data }) => {
  useRoles();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<InternalUser | null>(null);
  const [viewUser, setViewUser] = useState<InternalUser | null>(null);
  const [selectedDeleteUserId, setSelectedDeleteUserId] = useState<string | null>(null);
  const [selectedUserName, setSelectedUserName] = useState<string>("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleSuccess = () => {
    setIsModalOpen(false);
    setIsEditModalOpen(false);
  };

  const handleView = (user: InternalUser) => {
    setViewUser(user);
    setIsViewModalOpen(true);
  };

  const handleEdit = (id: string) => {
    const user = data.find(u => u.id === id);
    setSelectedUserId(id);
    setSelectedUser(user || null);
    setIsEditModalOpen(true);
  };

  const handleDelete = (id: string, name: string) => {
    setSelectedDeleteUserId(id);
    setSelectedUserName(name);
    setIsDeleteModalOpen(true);
  };

  const userColumns = columns({ onEdit: handleEdit, onDelete: handleDelete, onView: handleView });

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Usuarios (${data.length})`}
          description="Gestiona los usuarios del sistema"
          onAddNew={() => setIsModalOpen(true)}
        />
      </div>
      
      <Separator />
      
      <DataTable
        columns={userColumns}
        data={data}
        Filters={({ table }) => (
          <Filters<InternalUser>
            table={table}
            columnId="name"
            placeholder="Filtrar por nombre..."
          />
        )}
      />

      <UserModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleSuccess}
      />

      <ConfirmDeleteModal
        open={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        userId={selectedDeleteUserId}
        userName={selectedUserName}
      />

      <UserEditModal
        open={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        userId={selectedUserId}
        userData={selectedUser}
        onSuccess={handleSuccess}
      />

      <UserViewModal
        open={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        user={viewUser}
      />
    </>
  );
};
