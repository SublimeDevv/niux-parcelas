// app/admin/dashboard/plots/_components/client.tsx
"use client";
import { useState } from "react";
import { DataTable } from "@/components/ui/data-table";
import { Separator } from "@/components/ui/separator";
import { Filters } from "@/components/ui/filters";
import { columns} from "@/components/ui/plots/columns";
import { PlotModal } from "@/components/ui/plots/plot-modal";
import { Heading } from "@/components/ui/heading";
import { useRouter } from "next/navigation";
import { InternalPlot} from "@/modules/plots/models/plot";

interface PlotClientProps {
  data: InternalPlot[];
}

export const PlotClient: React.FC<PlotClientProps> = ({ data }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const handleSuccess = () => {
    router.refresh();
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Parcelas (${data.length})`}
          description="Gestiona las parcelas de tu sistema"
          onAddNew={() => setIsModalOpen(true)}
        />
      </div>
      
      <Separator />
      
      <DataTable
        columns={columns}
        data={data}
        Filters={({ table }) => (
          <Filters<InternalPlot>
            table={table}
            columnId="manager"
            placeholder="Filtrar por nombre..."
          />
        )}
      />

      <PlotModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleSuccess}
      />
    </>
  );
};