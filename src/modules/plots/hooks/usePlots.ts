// modules/plots/hooks/usePlots.ts
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getAllPlots,
  getPlotById,
  createPlot,
  updatePlot,
  deletePlot,
} from "../services/plotService";
import { PlotFormData, PlotUpdateData } from "../schemas/plotSchema";
import { toast } from "sonner";

// Query Keys
export const plotKeys = {
  all: ["plots-all"] as const,
  detail: (id: string) => ["plots", id] as const,
};

// Hook para obtener todas las parcelas
export const usePlots = () => {
  return useQuery({
    queryKey: plotKeys.all,
    queryFn: getAllPlots,
  });
};

// Hook para obtener una parcela específica
export const usePlot = (id: string) => {
  return useQuery({
    queryKey: plotKeys.detail(id),
    queryFn: () => getPlotById(id),
    enabled: !!id,
  });
};

// Hook para crear una parcela
export const useCreatePlot = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: PlotFormData) => createPlot(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: plotKeys.all });
      toast.success("Parcela creada exitosamente");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Error al crear la parcela");
    },
  });
};

// Hook para actualizar una parcela
export const useUpdatePlot = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: PlotUpdateData }) =>
      updatePlot(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: plotKeys.all });
      queryClient.invalidateQueries({ queryKey: plotKeys.detail(variables.id) });
      toast.success("Parcela actualizada exitosamente");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Error al actualizar la parcela");
    },
  });
};

// Hook para eliminar una parcela
export const useDeletePlot = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deletePlot(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: plotKeys.all });
      toast.success("Parcela eliminada exitosamente");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Error al eliminar la parcela");
    },
  });
};