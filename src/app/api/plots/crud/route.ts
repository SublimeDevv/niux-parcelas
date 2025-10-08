// app/api/plots/crud/route.ts
import prisma from "@/lib/db";
import { ResponseHelper} from "@/lib/response";
import { plotSchema } from "@/modules/plots/schemas/plotSchema";

export const GET = async () => {
    try {
        
  
  const plots = await prisma.plot.findMany({
    where: { isDeleted: false },
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
    orderBy: {
      createdAt: "desc",
    },
  });

  return ResponseHelper.ok(plots);
    } catch (error) {
        console.error("Error fetching plots:", error);
        return ResponseHelper.badRequest((error as Error).message || "Invalid data");        
    }
};

export const POST = async (request: Request) => {
    try{

        const body = await request.json();
        const { status, latitude, longitude, managerId, temperature, unit } = plotSchema.parse(body);
        
  const newPlot = await prisma.$transaction(async (tx) => {
      const plot = await tx.plot.create({
      data: {
          status,
        latitude,
        longitude,
        temperature,
        unit,
    },
    });
    
    if (managerId) {
      await tx.plotManager.create({
          data: {
          plotId: plot.id,
          userId: managerId,
        },
    });
    }
    
    return plot;
});

return ResponseHelper.created(newPlot);
}    catch (error: unknown) {
        console.error("Error creating plot:", error);
        return ResponseHelper.badRequest((error as Error).message || "Invalid data");
    }
};