// modules/users/hooks/useUsers.ts
import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "../services/userService";

export const userKeys = {
  all: ["users"] as const,
};

export const useUsers = () => {
  return useQuery({
    queryKey: userKeys.all,
    queryFn: getAllUsers,
    staleTime: 5 * 60 * 1000, // 5 minutos
  });
};