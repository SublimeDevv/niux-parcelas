// app/api/plots/crud/[id]/route.ts
import prisma from "@/lib/db";
import { ResponseHelper } from "@/lib/response";
import { plotUpdateSchema } from "@/modules/plots/schemas/plotSchema";

export const GET = 
  async (request: Request, { params }: { params: Promise<{ id: string }> }) => {
    try {
        
    const { id } = await params;
    const plot = await prisma.plot.findUnique({
      where: { id, isDeleted: false },
      include: {
        plotManagers: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });

    if (!plot) {
      return ResponseHelper.notFound("Parcela no encontrada");
    }

    return ResponseHelper.ok(plot);
      } catch (error) {
            console.error("Error fetching plot:", error);
        return ResponseHelper.badRequest((error as Error).message || "Invalid data");        

    }
  }
;

export const PATCH = 
async (request: Request, { params }: { params: Promise<{ id: string }> }) => {
    try {
        
    const { id } = await params;
    const body = await request.json();
    const data = plotUpdateSchema.parse(body);

    const updatedPlot = await prisma.$transaction(async (tx) => {
      const plot = await tx.plot.update({
        where: { id, isDeleted: false },
        data: {
          ...(data.status !== undefined && { status: data.status }),
          ...(data.temperature !== undefined && { temperature: data.temperature }),
          ...(data.unit !== undefined && { unit: data.unit }),
          ...(data.latitude !== undefined && { latitude: data.latitude }),
          ...(data.longitude !== undefined && { longitude: data.longitude }),
        },
      });

      // Si se proporciona managerId, actualizar la relación
      if (data.managerId !== undefined) {
        // Eliminar relaciones anteriores
        await tx.plotManager.deleteMany({
          where: { plotId: id },
        });

        // Crear nueva relación si hay managerId
        if (data.managerId) {
          await tx.plotManager.create({
            data: {
              plotId: id,
              userId: data.managerId,
            },
          });
        }
      }

      return plot;
    });

    return ResponseHelper.ok(updatedPlot);
      } catch (error) {
        console.error("Error updating plot:", error);
        return ResponseHelper.badRequest((error as Error).message || "Invalid data");        
    }
  }
;

export const DELETE =
  async (request: Request, { params }: { params: Promise<{ id: string }> }) => {
    try {
        
    const { id } = await params;
    await prisma.plot.update({
      where: { id },
      data: { isDeleted: true },
    });

    return ResponseHelper.ok({ message: "Parcela eliminada exitosamente" });
     } catch (error) {
       console.error("Error deleting plot:", error);
       return ResponseHelper.badRequest((error as Error).message || "Invalid data");
    }
  }
;