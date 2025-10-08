
import { db } from "@/lib/db";
import { ResponseHelper, withErrorHandling } from "@/lib/response";
import { plotService } from "@/modules/plots/services/plotService";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  return withErrorHandling(async () => {
    const plot = await plotService.findUnique({
      where: { id: params.id },
      include: {
        plotManagers: {
          include: {
            user: true,
          },
        },
      },
    });
    return ResponseHelper.ok(plot);
  });
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  return withErrorHandling(async () => {
    const body = await request.json();
    const plot = await plotService.update({
      where: { id: params.id },
      data: body,
    });
    return ResponseHelper.ok(plot);
  });
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  return withErrorHandling(async () => {
    const plot = await plotService.delete({ where: { id: params.id } });
    return ResponseHelper.ok(plot);
  });
}
