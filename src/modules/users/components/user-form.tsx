"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { userSchema, userUpdateSchema, UserFormData, UserUpdateData } from "../schemas/userSchema";
import { useRoles } from "@/modules/roles/hooks/useRoles";

interface UserFormProps {
  initialData?: Partial<UserFormData>;
  onSubmit: (data: UserFormData | UserUpdateData) => void;
  onCancel: () => void;
  isLoading?: boolean;
  isEdit?: boolean;
}

export const UserForm: React.FC<UserFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
  isLoading = false,
  isEdit = false,
}) => {
  const { data: rolesData, isLoading: rolesLoading } = useRoles();
  
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<UserFormData | UserUpdateData>({
    resolver: zodResolver(isEdit ? userUpdateSchema : userSchema),
    defaultValues: initialData,
  });

  const selectedRoleId = watch("roleId");

  useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);

  if (rolesLoading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-center p-8">
          <div className="text-center space-y-4">
            <div className="relative w-6 h-6 mx-auto">
              <div className="absolute top-0 left-0 w-full h-full border-2 border-primary/20 rounded-full"></div>
              <div className="absolute top-0 left-0 w-full h-full border-2 border-t-primary border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
            </div>
            <p className="text-sm text-muted-foreground">
              Cargando formulario...
            </p>
          </div>
        </div>
      </div>
    );
  }

  const roles = rolesData?.data || [];

  const handleFormSubmit = (data: UserFormData | UserUpdateData) => {
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">Nombre</Label>
          <Input
            id="firstName"
            placeholder="Ingresa el nombre"
            {...register("firstName")}
            disabled={isLoading}
          />
          {errors.firstName && (
            <p className="text-sm text-red-500">{errors.firstName.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="lastName">Apellido</Label>
          <Input
            id="lastName"
            placeholder="Ingresa el apellido"
            {...register("lastName")}
            disabled={isLoading}
          />
          {errors.lastName && (
            <p className="text-sm text-red-500">{errors.lastName.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="Ingresa el email"
          {...register("email")}
          disabled={isLoading}
        />
        {errors.email && (
          <p className="text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">
          {isEdit ? "Nueva Contraseña (opcional)" : "Contraseña"}
        </Label>
        <Input
          id="password"
          type="password"
          placeholder={isEdit ? "Dejar vacío para mantener la actual" : "Ingresa la contraseña"}
          {...register("password")}
          disabled={isLoading}
        />
        {isEdit && (
          <p className="text-sm text-gray-500">La contraseña debe tener al menos 6 caracteres</p>
        )}
        {errors.password && (
          <p className="text-sm text-red-500">{errors.password.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="roleId">Rol</Label>
        <Select
          value={selectedRoleId || ""}
          onValueChange={(value) => {
            setValue("roleId", value, { shouldValidate: true });
          }}
          disabled={isLoading}
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecciona un rol" />
          </SelectTrigger>
          <SelectContent>
            {roles.map((role) => (
              <SelectItem key={role.id} value={role.id}>
                {role.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.roleId && (
          <p className="text-sm text-red-500">{errors.roleId.message}</p>
        )}
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isLoading}
        >
          Cancelar
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Guardando..." : isEdit ? "Actualizar" : "Crear"}
        </Button>
      </div>
    </form>
  );
};
