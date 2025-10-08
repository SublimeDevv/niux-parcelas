import { HttpClient } from "@/services/httpClient";
import { Plots } from "../models/plot";
import { ApiPlot } from "../models/plot";
import { ResponseHelper } from "@/interfaces/ResponseHelper";
import { DashboardData } from "@/modules/plots/interfaces";
import { PlotFormData, PlotUpdateData } from "../schemas/plotSchema";

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


async function getAllPlots() {
  const response = await httpClient.get<ResponseHelper<ApiPlot[]>>(
    "/plots/crud"
  );
  return response.data;
}

async function getPlotById(id: string) {
  const response = await httpClient.get<ResponseHelper<ApiPlot>>(
    `/plots/crud/${id}`
  );
  return response;
}

async function createPlot(data: PlotFormData) {
  const response = await httpClient.post<ResponseHelper<ApiPlot>>(
    "/plots/crud",
    data
  );
  return response;
}

async function updatePlot(id: string, data: PlotUpdateData) {
  const response = await httpClient.patch<ResponseHelper<Plots>>(
    `/plots/crud/${id}`,
    data
  );
  return response;
}

async function deletePlot(id: string) {
  const response = await httpClient.delete<ResponseHelper<{ message: string }>>(
    `/plots/crud/${id}`
  );
  return response;
}

export {
  getListPlot,
  getPlotsDataChart,
  getAllPlots,
  getPlotById,
  createPlot,
  updatePlot,
  deletePlot,
};
