import { HttpClient } from "@/services/httpClient";
import { Plots } from "../models/plot";
import { ResponseHelper } from "@/interfaces/ResponseHelper";

const httpClient = new HttpClient();

async function getListPlot(limit: number, offset: number) {
  const response = await httpClient.get<ResponseHelper<Plots>>(
    `/plots?limit=${limit}&offset=${offset}`
  );
  return response;
}

export { getListPlot };