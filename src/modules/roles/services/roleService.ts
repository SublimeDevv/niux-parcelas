import { HttpClient } from "@/services/httpClient";
import { ResponseHelper } from "@/interfaces/ResponseHelper";
import { ApiRole } from "../interfaces";
import { RoleFormData, RoleUpdateData } from "../schemas/roleSchema";

const httpClient = new HttpClient();

async function getAllRoles(): Promise<ResponseHelper<ApiRole[]>> {
  
  const response = await httpClient.get<ResponseHelper<ApiRole[]>>("/roles/crud");
  return response;
}

async function getRoleById(id: string): Promise<ResponseHelper<ApiRole>> {
  const response = await httpClient.get<ResponseHelper<ApiRole>>(`/roles/crud/${id}`);
  return response;
}

async function createRole(data: RoleFormData): Promise<ResponseHelper<ApiRole>> {
  const response = await httpClient.post<ResponseHelper<ApiRole>>("/roles/crud", data);
  return response;
}

async function updateRole(id: string, data: RoleUpdateData): Promise<ResponseHelper<ApiRole>> {
  const response = await httpClient.patch<ResponseHelper<ApiRole>>(`/roles/crud/${id}`, data);
  return response;
}

async function deleteRole(id: string): Promise<ResponseHelper<{ message: string }>> {
  const response = await httpClient.delete<ResponseHelper<{ message: string }>>(`/roles/crud/${id}`);
  return response;
}

export {
  getAllRoles,
  getRoleById,
  createRole,
  updateRole,
  deleteRole,
};
