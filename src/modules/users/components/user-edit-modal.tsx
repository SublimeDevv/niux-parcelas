"use client";
import { Modal } from "@/components/ui/modal";
import { UserForm } from "./user-form";
import { useUpdateUser, useUser } from "../hooks/useUsers";
import { UserFormData, UserUpdateData } from "../schemas/userSchema";
import { InternalUser } from "../interfaces";

interface UserEditModalProps {
  open: boolean;
  onClose: () => void;
  userId: string | null;
  userData?: InternalUser | null;
  onSuccess?: () => void;
}

export const UserEditModal: React.FC<UserEditModalProps> = ({
  open,
  onClose,
  userId,
  userData,
  onSuccess,
}) => {
  const { data: apiUserData, isLoading: userLoading } = useUser(
    userId || "", 
    { enabled: !!userId && !userData }
  );
  const updateUserMutation = useUpdateUser();

  const currentUserData = userData || apiUserData?.data;

  const handleSubmit = async (data: UserFormData | UserUpdateData) => {
    if (!userId) return;
    
    try {
      const updateData = { ...data };
      if (!updateData.password || updateData.password.trim() === "") {
        delete updateData.password;
      }
            
      await updateUserMutation.mutateAsync({ id: userId, data: updateData });
      onClose();
      onSuccess?.();
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  if (userLoading && !userData) {
    return;
  }

  if (!currentUserData) {
    return (
      <Modal
        title="Editar Usuario"
        description="Error al cargar los datos del usuario"
        isOpen={open}
        onClose={onClose}
      >
        <div className="flex items-center justify-center p-8">
          <p className="text-sm text-muted-foreground">
            No se pudieron cargar los datos del usuario.
          </p>
        </div>
      </Modal>
    );
  }

  let user, role;
  
  if (userData) {
    user = {
      name: userData.name,
      email: userData.email,
    };
    role = { id: userData.roleId };
  } else if (apiUserData?.data) {
    user = apiUserData.data;
    role = user.usersRoles?.[0]?.role;
  }

  const initialData = {
    firstName: user.name.split(" ")[0] || "",
    lastName: user.name.split(" ").slice(1).join(" ") || "",
    email: user.email,
    password: "", 
    roleId: role?.id || "",
  };

  return (
    <Modal
      title="Editar Usuario"
      description="Modifica los datos del usuario"
      isOpen={open}
      onClose={onClose}
    >
      <UserForm
        initialData={initialData}
        onSubmit={handleSubmit}
        onCancel={onClose}
        isLoading={updateUserMutation.isPending}
        isEdit={true}
      />
    </Modal>
  );
};
