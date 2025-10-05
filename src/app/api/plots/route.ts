import getRedisClient from "@/lib/redis";
import { getCached } from "@/lib/redis-helpers";
import { ResponseHelper, withErrorHandling } from "@/lib/response";
import { Plots } from "@/modules/plots/interfaces/plotsApi";


export async function GET(request: Request) {
  return withErrorHandling(async () => {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '10', 10);
    const offset = parseInt(searchParams.get('offset') || '0', 10);

    const redis = await getRedisClient();
    const cachedData = await getCached<Plots>(redis, "lista_parcelas");
    
    const parcelas = cachedData.temperatura;

    if (cachedData) {
      const paginatedData = Array.isArray(parcelas) 
        ? parcelas.slice(offset, offset + limit)
        : parcelas;
      

      const response = {
        temperatura: paginatedData,
        pagination: {
          limit,
          offset,
          total: Array.isArray(cachedData) ? cachedData.length : 0,
          hasMore: Array.isArray(cachedData) ? offset + limit < cachedData.length : false
        }
      };
      
      return ResponseHelper.ok(response);
    }
  });
}