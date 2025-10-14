import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getAllRoles,
  getRoleById,
  createRole,
  updateRole,
  deleteRole,
} from "../services/roleService";
import { RoleFormData, RoleUpdateData } from "../schemas/roleSchema";
import { toast } from "sonner";

export const roleKeys = {
  all: ["roles-all"] as const,
  detail: (id: string) => ["roles", id] as const,
};

export const useRoles = () => {
  return useQuery({
    queryKey: roleKeys.all,
    queryFn: getAllRoles,
  });
};

export const useRole = (id: string) => {
  return useQuery({
    queryKey: roleKeys.detail(id),
    queryFn: () => getRoleById(id),
    enabled: !!id,
  });
};

export const useCreateRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: RoleFormData) => createRole(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: roleKeys.all });
      toast.success("Rol creado exitosamente");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Error al crear el rol");
    },
  });
};

export const useUpdateRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: RoleUpdateData }) =>
      updateRole(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: roleKeys.all });
      queryClient.invalidateQueries({ queryKey: roleKeys.detail(variables.id) });
      toast.success("Rol actualizado exitosamente");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Error al actualizar el rol");
    },
  });
};

export const useDeleteRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteRole(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: roleKeys.all });
      toast.success("Rol eliminado exitosamente");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Error al eliminar el rol");
    },
  });
};
