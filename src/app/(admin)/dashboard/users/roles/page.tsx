'use client';

import { useRoles } from "@/modules/roles/hooks/useRoles";
import { RoleClient } from "@/modules/roles/components";
import { InternalRole } from "@/modules/roles/interfaces";
import Loading from "@/components/ui/loaders/loading";
import ErrorLoad from "@/components/ui/errorLoad";

export default function RolesPage() {
  const { data: rolesResponse, isLoading, error } = useRoles();

  if (isLoading) {
    return (
      <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <Loading />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <ErrorLoad 
            error={error.message} 
            title="Error al cargar roles"
            description="No se pudieron cargar los roles del sistema"
          />
        </div>
      </div>
    );
  }

  const roles: InternalRole[] = rolesResponse?.data?.map((role) => ({
    id: role.id,
    name: role.name,
    createdAt: role.createdAt,
    updatedAt: role.updatedAt,
    usersCount: role.usersRoles?.length || 0,
  })) || [];

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <RoleClient data={roles} />
      </div>
    </div>
  );
}