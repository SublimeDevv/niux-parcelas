"use client";
import { useState } from "react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { useDeleteUser } from "../hooks/useUsers";
import { Checkbox } from "@/components/ui/checkbox";

interface ConfirmDeleteModalProps {
  open: boolean;
  onClose: () => void;
  userId: string | null;
  userName?: string;
}

export const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({
  open,
  onClose,
  userId,
  userName,
}) => {
  const [permanent, setPermanent] = useState(false);
  const deleteUserMutation = useDeleteUser();

  const handleDelete = async () => {
    if (!userId) return;

    try {
      await deleteUserMutation.mutateAsync({ id: userId, permanent });
      onClose();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <Modal
      title="Confirmar Eliminación"
      description={`¿Estás seguro de que deseas eliminar al usuario ${userName || ""}?`}
      isOpen={open}
      onClose={onClose}
    >
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="permanent"
            checked={permanent}
            onCheckedChange={(checked) => setPermanent(checked as boolean)}
          />
          <label
            htmlFor="permanent"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Eliminación permanente (no se puede deshacer)
          </label>
        </div>
        
        <p className="text-sm text-muted-foreground">
          {permanent
            ? "Esta acción eliminará permanentemente al usuario y todos sus datos asociados."
            : "Esta acción deshabilitará al usuario, pero se puede revertir más tarde."}
        </p>

        <div className="flex justify-end gap-2 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={deleteUserMutation.isPending}
          >
            Cancelar
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={handleDelete}
            disabled={deleteUserMutation.isPending}
          >
            {deleteUserMutation.isPending
              ? "Eliminando..."
              : permanent
              ? "Eliminar Permanentemente"
              : "Deshabilitar"}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
