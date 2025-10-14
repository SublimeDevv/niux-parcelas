
import { db } from "@/lib/db";
import { ResponseHelper, withErrorHandling } from "@/lib/response";
import { plotSchema } from "@/modules/plots/schemas/plotSchema";

export const GET = withErrorHandling(async (_request: Request, { params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    const plot = await db.plot.findUniqueOrThrow({
        where: { id, isDeleted: false },
        include: {
            plotManagers: {
                include: {
                    user: {
                        select: {
                            id: true,
                            name: true,
                            email: true
                        }
                    }
                }
            }
        }
    });
    return ResponseHelper.ok(plot);
});

export const PUT = withErrorHandling(async (request: Request, { params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    const body = await request.json();
    const { status, latitude, longitude, managerId } = plotSchema.parse(body);

    const updatedPlot = await db.$transaction(async (prisma) => {
        const plot = await prisma.plot.update({
            where: { id },
            data: {
                status,
                latitude,
                longitude
            }
        });

        if (managerId) {
            await prisma.plotManager.deleteMany({
                where: { plotId: id }
            });
            await prisma.plotManager.create({
                data: {
                    plotId: id,
                    userId: managerId
                }
            });
        }

        return plot;
    });

    return ResponseHelper.ok(updatedPlot);
});

export const DELETE = withErrorHandling(async (_request: Request, { params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    await db.plot.update({
        where: { id },
        data: {
            isDeleted: true,
            deletedAt: new Date()
        }
    });
    return ResponseHelper.ok({ message: "Parcela eliminada correctamente" });
});
