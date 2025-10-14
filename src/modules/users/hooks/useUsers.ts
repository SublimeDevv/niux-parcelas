import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from "../services/userService";
import { UserFormData, UserUpdateData } from "../schemas/userSchema";
import { toast } from "sonner";

export const userKeys = {
  all: ["users-all"] as const,
  detail: (id: string) => ["users", id] as const,
};

export const useUsers = () => {
  return useQuery({
    queryKey: userKeys.all,
    queryFn: getAllUsers,
  });
};

export const useUser = (id: string, options?: { enabled?: boolean }) => {
  return useQuery({
    queryKey: userKeys.detail(id),
    queryFn: () => getUserById(id),
    enabled: options?.enabled !== undefined ? options.enabled : !!id,
  });
};

export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UserFormData) => createUser(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.all });
      toast.success("Usuario creado exitosamente");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Error al crear el usuario");
    },
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UserUpdateData }) =>
      updateUser(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: userKeys.all });
      queryClient.invalidateQueries({ queryKey: userKeys.detail(variables.id) });
      toast.success("Usuario actualizado exitosamente");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Error al actualizar el usuario");
    },
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, permanent }: { id: string; permanent: boolean }) => 
      deleteUser(id, permanent),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: userKeys.all });
      toast.success(
        variables.permanent 
          ? "Usuario eliminado permanentemente" 
          : "Usuario deshabilitado exitosamente"
      );
    },
    onError: (error: Error) => {
      toast.error(error.message || "Error al eliminar el usuario");
    },
  });
};