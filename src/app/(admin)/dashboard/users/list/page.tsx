"use client";

import { ErrorLoad, Loading } from "@/components";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "@/components/ui/users";
import { getAllUsers } from "@/modules/users/services/userService";
import { useQuery } from "@tanstack/react-query";
import { Filters } from "@/components/ui/filters";

export default function UserListPage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["usersList"],
    queryFn: () => getAllUsers(),
  });
  console.log(data);

  if (isLoading) return <Loading />;

  if (error) return <ErrorLoad />;

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data.data} Filters={Filters} />
    </div>
  );
}
