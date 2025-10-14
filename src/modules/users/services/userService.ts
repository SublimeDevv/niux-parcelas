import { HttpClient } from "@/services/httpClient";
import { ResponseHelper } from "@/interfaces/ResponseHelper";
import { ApiUser } from "../interfaces";
import { UserFormData, UserUpdateData } from "../schemas/userSchema";

const httpClient = new HttpClient();

async function getAllUsers(): Promise<ResponseHelper<ApiUser[]>> {
  const response = await httpClient.get<ResponseHelper<ApiUser[]>>("/users/crud");
  return response;
}

async function getUserById(id: string): Promise<ResponseHelper<ApiUser>> {
  const response = await httpClient.get<ResponseHelper<ApiUser>>(`/users/crud/${id}`);
  return response;
}

async function createUser(data: UserFormData): Promise<ResponseHelper<ApiUser>> {
  const response = await httpClient.post<ResponseHelper<ApiUser>>("/users/crud", data);
  return response;
}

async function updateUser(id: string, data: UserUpdateData): Promise<ResponseHelper<ApiUser>> {
  const response = await httpClient.patch<ResponseHelper<ApiUser>>(`/users/crud/${id}`, data);
  return response;
}

async function deleteUser(id: string, permanent: boolean = false): Promise<ResponseHelper<{ message: string }>> {  const response = await httpClient.delete<ResponseHelper<{ message: string }>>(
    `/users/crud/${id}?permanent=${permanent}`
  );
  return response;
}

export {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
