"use client";
import { Modal } from "@/components/ui/modal";
import { RoleForm } from "./role-form";
import { useRole, useUpdateRole } from "../hooks/useRoles";
import { RoleFormData } from "../schemas/roleSchema";

interface RoleEditModalProps {
  open: boolean;
  onClose: () => void;
  roleId: string | null;
  onSuccess?: () => void;
}

export const RoleEditModal: React.FC<RoleEditModalProps> = ({
  open,
  onClose,
  roleId,
  onSuccess,
}) => {
  const { data: roleData, isLoading: isLoadingRole } = useRole(roleId || "");
  const updateRoleMutation = useUpdateRole();

  const handleSubmit = async (data: RoleFormData) => {
    if (!roleId) return;

    try {
      await updateRoleMutation.mutateAsync({ id: roleId, data });
      onClose();
      onSuccess?.();
    } catch (error) {
      console.error("Error updating role:", error);
    }
  };

  if (!roleId) return null;

  return (
    <Modal
      title="Editar Rol"
      description="Modifica los datos del rol"
      isOpen={open}
      onClose={onClose}
    >
      {isLoadingRole ? (
        <div className="flex justify-center py-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      ) : (
        <RoleForm
          initialData={roleData?.data ? { name: roleData.data.name } : undefined}
          onSubmit={handleSubmit}
          onCancel={onClose}
          isLoading={updateRoleMutation.isPending}
        />
      )}
    </Modal>
  );
};
