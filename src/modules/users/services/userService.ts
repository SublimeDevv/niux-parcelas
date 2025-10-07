import { HttpClient } from "@/services/httpClient";
import { ResponseHelper } from "@/interfaces/ResponseHelper";
import User from "../interfaces/userList";

const httpClient = new HttpClient();

async function getAllUsers() {
  const response = await httpClient.get<ResponseHelper<User[]>>("/users");
  return response;
}

export { getAllUsers };
