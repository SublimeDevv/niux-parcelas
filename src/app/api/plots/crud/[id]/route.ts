// app/api/plots/crud/[id]/route.ts
import prisma from "@/lib/db";
import { ResponseHelper, withErrorHandling } from "@/lib/response";
import { plotUpdateSchema } from "@/modules/plots/schemas/plotSchema";

export const GET = withErrorHandling(
  async (request: Request, { params }: { params: { id: string } }) => {
    const plot = await prisma.plot.findUnique({
      where: { id: params.id, isDeleted: false },
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
  }
);

export const PATCH = withErrorHandling(
  async (request: Request, { params }: { params: { id: string } }) => {
    const body = await request.json();
    const data = plotUpdateSchema.parse(body);

    const updatedPlot = await prisma.$transaction(async (tx) => {
      const plot = await tx.plot.update({
        where: { id: params.id, isDeleted: false },
        data: {
          ...(data.status !== undefined && { status: data.status }),
          ...(data.latitude !== undefined && { latitude: data.latitude }),
          ...(data.longitude !== undefined && { longitude: data.longitude }),
        },
      });

      // Si se proporciona managerId, actualizar la relación
      if (data.managerId !== undefined) {
        // Eliminar relaciones anteriores
        await tx.plotManager.deleteMany({
          where: { plotId: params.id },
        });

        // Crear nueva relación si hay managerId
        if (data.managerId) {
          await tx.plotManager.create({
            data: {
              plotId: params.id,
              userId: data.managerId,
            },
          });
        }
      }

      return plot;
    });

    return ResponseHelper.ok(updatedPlot);
  }
);

export const DELETE = withErrorHandling(
  async (request: Request, { params }: { params: { id: string } }) => {
    await prisma.plot.update({
      where: { id: params.id },
      data: { isDeleted: true },
    });

    return ResponseHelper.ok({ message: "Parcela eliminada exitosamente" });
  }
);