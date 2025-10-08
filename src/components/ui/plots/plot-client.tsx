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
import { PlotEditModal } from "@/components/ui/plots/plot-edit-modal";
import { ConfirmDeleteModal } from "./confirm-delete-modal";
interface PlotClientProps {
  data: InternalPlot[];
}

export const PlotClient: React.FC<PlotClientProps> = ({ data }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedPlotId, setSelectedPlotId] = useState<string | null>(null);
  const [selectedDeletePlotId, setSelectedDeletePlotId] = useState<string | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const router = useRouter();

  const handleSuccess = () => {
    router.refresh();
  };

    const handleEdit = (id: string) => {
    console.log("handleEdit", id);
    setSelectedPlotId(id);
    setIsEditModalOpen(true);
  };

  const handleDelete = (id: string) => {
    setSelectedDeletePlotId(id);
    setIsDeleteModalOpen(true);
  }
    const plotColumns = columns({ onEdit: handleEdit, onDelete: handleDelete });

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
        columns={plotColumns}
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

        <ConfirmDeleteModal
        open={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        plotId={selectedDeletePlotId}
      />

      
      {/* Modal de edición */}
      <PlotEditModal
        open={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        plotId={selectedPlotId}
        onSuccess={handleSuccess}
      />
    </>
  );
};