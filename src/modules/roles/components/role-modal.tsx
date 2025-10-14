"use client";
import { Modal } from "@/components/ui/modal";
import { RoleForm } from "./role-form";
import { useCreateRole } from "../hooks/useRoles";
import { RoleFormData } from "../schemas/roleSchema";

interface RoleModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export const RoleModal: React.FC<RoleModalProps> = ({
  open,
  onClose,
  onSuccess,
}) => {
  const createRoleMutation = useCreateRole();

  const handleSubmit = async (data: RoleFormData) => {
    try {
      await createRoleMutation.mutateAsync(data);
      onClose();
      onSuccess?.();
    } catch (error) {
      console.error("Error creating role:", error);
    }
  };

  return (
    <Modal
      title="Crear Nuevo Rol"
      description="Ingresa los datos del nuevo rol"
      isOpen={open}
      onClose={onClose}
    >
      <RoleForm
        onSubmit={handleSubmit}
        onCancel={onClose}
        isLoading={createRoleMutation.isPending}
      />
    </Modal>
  );
};
