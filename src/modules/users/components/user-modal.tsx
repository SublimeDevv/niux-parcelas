"use client";
import { Modal } from "@/components/ui/modal";
import { UserForm } from "./user-form";
import { useCreateUser } from "../hooks/useUsers";
import { UserFormData } from "../schemas/userSchema";

interface UserModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export const UserModal: React.FC<UserModalProps> = ({
  open,
  onClose,
  onSuccess,
}) => {
  const createUserMutation = useCreateUser();

  const handleSubmit = async (data: UserFormData) => {
    try {
      await createUserMutation.mutateAsync(data);
      onClose();
      onSuccess?.();
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  return (
    <Modal
      title="Crear Nuevo Usuario"
      description="Ingresa los datos del nuevo usuario"
      isOpen={open}
      onClose={onClose}
    >
      <UserForm
        onSubmit={handleSubmit}
        onCancel={onClose}
        isLoading={createUserMutation.isPending}
      />
    </Modal>
  );
};
