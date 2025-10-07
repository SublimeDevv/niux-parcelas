import { HttpClient } from "@/services/httpClient";
import { Plots } from "../models/plot";
import { ResponseHelper } from "@/interfaces/ResponseHelper";
import { DashboardData } from "@/modules/plots/interfaces";

const httpClient = new HttpClient();

async function getListPlot(limit: number, offset: number) {
  const response = await httpClient.get<ResponseHelper<Plots>>(
    `/plots?limit=${limit}&offset=${offset}`
  );
  return response;
}

async function getPlotsDataChart() {
  const response = await httpClient.get<ResponseHelper<DashboardData>>(
    "/plots/charts"
  );
  return response;
}

export { getListPlot, getPlotsDataChart };
