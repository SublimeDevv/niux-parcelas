"use client";
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useUpdatePlot, usePlot } from "@/modules/plots/hooks/usePlots";
import { PlotUpdateData } from "@/modules/plots/schemas/plotSchema";

interface PlotEditModalProps {
  open: boolean;
  onClose: () => void;
  plotId: string | null;
  onSuccess: () => void;
}

export const PlotEditModal: React.FC<PlotEditModalProps> = ({
  open,
  onClose,
  plotId,
  onSuccess,
}) => {
  const { data: plotData } = usePlot(plotId || "");
  const { mutate: updatePlot, isPending } = useUpdatePlot();

  const [formData, setFormData] = useState<PlotUpdateData>({
    temperature: 0,
    unit: "",
    latitude: 0,
    longitude: 0,
    status: "",
    manager: "",
  });

  // Cuando se cargan los datos, llenar el formulario
  useEffect(() => {
    console.log("se eejcuta");
    console.log("plotData", plotData);
    if (plotData?.data) {
      const { temperature, unit, latitude, longitude, status, manager } = plotData.data;
      setFormData({
        temperature: temperature?.toString() || "",
        unit: unit || "",
        latitude: latitude?.toString() || "",
        longitude: longitude?.toString() || "",
        status: status || "",
        manager: manager || "",
      });
    }
  }, [plotData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!plotId) return;
    updatePlot(
      { id: plotId, data: formData },
      {
        onSuccess: () => {
          onSuccess();
          onClose();
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Editar Parcela</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-2">
            <Label>Temperatura</Label>
            <Input
              name="temperature"
              value={formData.temperature}
              onChange={handleChange}
              placeholder="Temperatura"
            />
          </div>

          <div className="grid gap-2">
            <Label>Unidad</Label>
            <Input
              name="unit"
              value={formData.unit}
              onChange={handleChange}
              placeholder="Unidad"
            />
          </div>

          <div className="grid gap-2">
            <Label>Latitud</Label>
            <Input
              name="latitude"
              value={formData.latitude}
              onChange={handleChange}
              placeholder="Latitud"
            />
          </div>

          <div className="grid gap-2">
            <Label>Longitud</Label>
            <Input
              name="longitude"
              value={formData.longitude}
              onChange={handleChange}
              placeholder="Longitud"
            />
          </div>

          <div className="grid gap-2">
            <Label>Estado</Label>
            <Input
              name="status"
              value={formData.status}
              onChange={handleChange}
              placeholder="Estado"
            />
          </div>

          <div className="grid gap-2">
            <Label>Responsable</Label>
            <Input
              name="manager"
              value={formData?.manager}
              onChange={handleChange}
              placeholder="Responsable"
            />
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Guardando..." : "Guardar cambios"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
