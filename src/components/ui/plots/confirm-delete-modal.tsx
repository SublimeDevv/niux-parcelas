"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useDeletePlot } from "@/modules/plots/hooks/usePlots";

interface ConfirmDeleteModalProps {
  open: boolean;
  onClose: () => void;
  plotId?: string;
}

export function ConfirmDeleteModal({
  open,
  onClose,
  plotId,
}: ConfirmDeleteModalProps) {
     const { mutate: deletePlot } = useDeletePlot();
     const onConfirm = () => {
         if (plotId) {
           deletePlot(   plotId,
      {
        onSuccess: () => {
          onClose();
        },
      });
         }
       };
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Eliminar parcela</DialogTitle>
          <DialogDescription>
            ¿Estás seguro de eliminar la parcela con ID{" "}
            <span className="font-semibold">{plotId}</span>?  
            Esta acción no se puede deshacer.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button variant="destructive" onClick={onConfirm}>
            Eliminar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
