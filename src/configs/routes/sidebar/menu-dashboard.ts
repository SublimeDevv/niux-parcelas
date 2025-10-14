import { Home, Users, Package, UserCircle, Shield, ClipboardList } from "lucide-react";
import { MenuItem } from "@/interfaces/MenuItem";

export const defaultMenuItems: MenuItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: Home,
    href: "/dashboard",
  },
  {
    id: "users",
    label: "Usuarios",
    icon: Users,
    children: [
      {
        id: "users-list",
        label: "Lista de usuarios",
        icon: UserCircle,
        href: "/dashboard/users/list",
      },
      {
        id: "users-roles",
        label: "Roles",
        icon: Shield,
        href: "/dashboard/users/roles",
      },
    ],
  },
  {
    id: "plots",
    label: "Parcelas",
    icon: Package,
    children: [
      {
        id: "plots-list",
        label: "Monitoreo de parcelas",
        icon: Package,
        href: "/dashboard/plots/list",
      },
      {
        id: "plots-crud",
        label: "Gestión de parcelas",
        icon: ClipboardList,
        href: "/dashboard/plots",
      },
    ],
  },
];
