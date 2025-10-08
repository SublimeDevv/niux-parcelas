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
        label: "Lista de Usuarios",
        icon: UserCircle,
        href: "/dashboard/users/list",
      },
      {
        id: "users-roles",
        label: "Roles y Permisos",
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
        label: "Monitoreo de Parcelas",
        icon: Package,
        href: "/dashboard/plots/list",
      },
      {
        id: "plots-crud",
        label: "Gestión de Parcelas",
        icon: ClipboardList,
        href: "/dashboard/plots",
      },
    ],
  },
];
