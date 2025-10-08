// components/ui/plots/plot-form.tsx
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Loader2 } from "lucide-react";
import { plotSchema, PlotFormData } from "@/modules/plots/schemas/plotSchema";
import { useCreatePlot } from "@/modules/plots/hooks/usePlots";
import { useUsers } from "@/modules/users/hooks/useUsers";
import {  PlotUpdateData } from "@/modules/plots/schemas/plotSchema";
import {  useUpdatePlot, usePlot } from "@/modules/plots/hooks/usePlots";
import { useEffect } from "react";

interface PlotFormProps {
  onClose: () => void;
    onSuccess: () => void;
  plotId?: string | null;
}
export const PlotForm: React.FC<PlotFormProps> = ({ onClose, onSuccess, plotId }) => {
  const createPlot = useCreatePlot();
  const isEditing = Boolean(plotId);
  const updatePlot = useUpdatePlot();
  const { data: usersData, isLoading: isLoadingUsers } = useUsers();
  const { data: plotData } = usePlot(plotId ?? "");
  const form = useForm<PlotFormData>({
    resolver: zodResolver(plotSchema),
    defaultValues: {
      latitude: 0,
      longitude: 0,
      temperature: 0,
      unit: "celsius",
      status: true,
      managerId: undefined,
    },
  });

   useEffect(() => {
    if (isEditing && plotData?.data) {
      const p = plotData.data;
      form.reset({
        latitude: Number(p.latitude),
        longitude: Number(p.longitude),
        temperature: p.temperature,
        unit: p.unit,
        status: !!p.status,
        managerId: p.plotManagers?.[0]?.user.id,
      });
    }
  }, [isEditing, plotData, form]);

  const onSubmit = async (data: PlotFormData) => {
    // Transformar "none" a undefined antes de enviar
    const submitData = {
      ...data,
      managerId: data.managerId === "none" ? undefined : data.managerId,
    };
    
    createPlot.mutate(submitData, {
      onSuccess: () => {
        form.reset();
        onClose();
      },
    });
  };

  const users = usersData?.data || [];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="latitude"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Latitud</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="any"
                    placeholder="19.432608"
                    disabled={createPlot.isPending}
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Coordenada de latitud de la parcela
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="longitude"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Longitud</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="any"
                    placeholder="-99.133209"
                    disabled={createPlot.isPending}
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Coordenada de longitud de la parcela
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="temperature"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Temperatura</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="0.1"
                    placeholder="25.5"
                    disabled={createPlot.isPending}
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Temperatura de la parcela
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="unit"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Unidad de temperatura</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  disabled={createPlot.isPending}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar unidad" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="celsius">Celsius (°C)</SelectItem>
                    <SelectItem value="fahrenheit">Fahrenheit (°F)</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  Unidad de medida de la temperatura
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="managerId"
          render={({ field }) => (
            <FormItem>
           
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                disabled={createPlot.isPending || isLoadingUsers}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar encargado" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="none">Sin encargado</SelectItem>
                  {isLoadingUsers ? (
                    <SelectItem value="loading" disabled>
                      Cargando usuarios...
                    </SelectItem>
                  ) : (
                    users.map((user) => (
                      <SelectItem key={user.id} value={user.id}>
                        {user.name} ({user.email})
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
              <FormDescription>
                Usuario que será asignado como encargado de la parcela
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Estado</FormLabel>
                <FormDescription>
                  Activa o desactiva la parcela
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  disabled={createPlot.isPending}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={createPlot.isPending}
          >
            Cancelar
          </Button>
          <Button type="submit" disabled={createPlot.isPending}>
            {createPlot.isPending && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            Crear Parcela
          </Button>
        </div>
      </form>
    </Form>
  );
};