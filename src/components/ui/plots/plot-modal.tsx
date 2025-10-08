// components/plots/plot-modal.tsx
"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { PlotForm } from "@/components/ui/plots/plot-form";

interface PlotModalProps {
  open: boolean;
  onClose: () => void;
}

export const PlotModal: React.FC<PlotModalProps> = ({ open, onClose }) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Crear Nueva Parcela</DialogTitle>
          <DialogDescription>
            Completa la información de la nueva parcela
          </DialogDescription>
        </DialogHeader>
        <PlotForm onClose={onClose} />
      </DialogContent>
    </Dialog>
  );
};