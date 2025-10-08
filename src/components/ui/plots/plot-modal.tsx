"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { PlotForm } from "./plot-form";

interface PlotModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  plotId?: string | null;
}

export const PlotModal: React.FC<PlotModalProps> = ({
  open,
  onClose,
  onSuccess,
  plotId,
}) => {
  const isEditing = Boolean(plotId);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Editar Parcela" : "Crear Parcela"}
          </DialogTitle>
        </DialogHeader>
        <PlotForm onClose={onClose} onSuccess={onSuccess} plotId={plotId} />
      </DialogContent>
    </Dialog>
  );
};
