"use client";
import { AlertModal } from "@/components/modals/alert-modal";
import { useDeleteRole } from "../hooks/useRoles";

interface ConfirmDeleteModalProps {
  open: boolean;
  onClose: () => void;
  roleId: string | null;
}

export const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({
  open,
  onClose,
  roleId,
}) => {
  const deleteRoleMutation = useDeleteRole();

  const handleConfirm = async () => {
    if (!roleId) return;

    try {
      await deleteRoleMutation.mutateAsync(roleId);
      onClose();
    } catch (error) {
      console.error("Error deleting role:", error);
    }
  };

  return (
    <AlertModal
      isOpen={open}
      onClose={onClose}
      onConfirm={handleConfirm}
      loading={deleteRoleMutation.isPending}
    />
  );
};
