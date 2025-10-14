"use client";

import { ErrorLoad, Loading } from "@/components";
import { useUsers } from "@/modules/users/hooks/useUsers";
import { UserClient } from "@/modules/users/components";
import { InternalUser } from "@/modules/users/interfaces";

export default function UserListPage() {
  const { data, isLoading, error } = useUsers();

  if (isLoading) return <Loading />;

  if (error) return <ErrorLoad />;

  const transformedData: InternalUser[] = data?.data?.map((user) => ({
    id: user.id,
    name: user.name,
    userName: user.userName,
    email: user.email,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
    rol: user.usersRoles?.[0]?.role?.name || "Sin rol",
    roleId: user.usersRoles?.[0]?.role?.id,
  })) || [];

  return (
    <div className="container mx-auto py-10">
      <UserClient data={transformedData} />
    </div>
  );
}
