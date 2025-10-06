import { DataTable } from "@/components/ui/data-table";
import { columns,type User } from "@/components/ui/users";
async function getData(): Promise<User[]> {
  // Fetch data
  return [
    {
      id: "728ed52f",
      name:"John Doe",
      email: "m@example.com",
      rol: "user",
      status: "active",
      createdAt: "2022-01-01",
    },
  ]
}
export default async function UserListPage() {  
  const data = await getData()
  return(

    <div className="container mx-auto py-10">
    <DataTable columns={columns} data={data} />
    </div>
  
  )
}