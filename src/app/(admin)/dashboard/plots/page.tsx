"use client";

import { PlotClient } from "@/components/ui/plots/plot-client";
import { usePlots } from "@/modules/plots/hooks/usePlots";

const PlotsPage = () => {
  const { data, isLoading, isError } = usePlots();
  console.log(data);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-muted-foreground">Cargando parcelas...</p>
      </div>
    );
  }

  if (isError || !data) {
    console.error("Error loading plots:", isError);
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-destructive">Error al cargar las parcelas</p>
      </div>
    );
  }

  // 🧩 Ajustamos el formato de los datos para la vista (como antes)
  const formattedPlots = data.map((item) => ({
    id: item.id,
    status: item.status ? "Activo" : "Inactivo",
    temperature: Number(item.temperature),
    unit: item.unit,
    latitude: item.latitude?.toString(),
    longitude: item.longitude?.toString(),
    manager: item.plotManagers
      ?.map((pm) => pm.user?.name)
      .filter(Boolean)
      .join(", ") || "N/A",
    createdAt: new Date(item.createdAt).toLocaleDateString("es-MX", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }),
  }));

    return (
      <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <PlotClient data={formattedPlots} />
      </div>
    </div>
  );

};

export default PlotsPage;
