
import { db } from "@/lib/db";
import { ResponseHelper, withErrorHandling } from "@/lib/response";
import { plotService } from "@/modules/plots/services/plotService";

export async function GET(request: Request) {
  return withErrorHandling(async () => {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get("limit") || "10", 10);
    const offset = parseInt(search_params.get("offset") || "0", 10);

    const plots = await plotService.findMany({
      skip: offset,
      take: limit,
      include: {
        plotManagers: {
          include: {
            user: true,
          },
        },
      },
    });

    const total = await plotService.count();

    const response = {
      data: plots,
      pagination: {
        limit,
        offset,
        total,
        hasMore: offset + limit < total,
      },
    };

    return ResponseHelper.ok(response);
  });
}

export async function POST(request: Request) {
  return withErrorHandling(async () => {
    const body = await request.json();
    const plot = await plotService.create(body);
    return ResponseHelper.ok(plot);
  });
}
