import { 
  Home, 
  Users, 
  Settings, 
  FileText, 
  BarChart3, 
  ShoppingCart, 
  Package,
  CreditCard,
  UserCircle,
  Shield,
  Bell,
  Calendar,
  HelpCircle
} from "lucide-react";
import { MenuItem } from "@/interfaces/MenuItem";

export const defaultMenuItems: MenuItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: Home,
    href: "/dashboard"
  },
  {
    id: "users",
    label: "Usuarios",
    icon: Users,
    badge: 5,
    children: [
      {
        id: "users-list",
        label: "Lista de Usuarios",
        icon: UserCircle,
        href: "/dashboard/users/list"
      },
      {
        id: "users-roles",
        label: "Roles y Permisos",
        icon: Shield,
        href: "/dashboard/users/roles"
      }
    ]
  },
  {
    id: "products",
    label: "Productos",
    icon: Package,
    children: [
      {
        id: "products-list",
        label: "Catálogo",
        icon: Package,
        href: "/products"
      },
      {
        id: "products-inventory",
        label: "Inventario",
        icon: BarChart3,
        href: "/products/inventory"
      }
    ]
  },
  {
    id: "orders",
    label: "Pedidos",
    icon: ShoppingCart,
    badge: "12",
    href: "/orders"
  },
  {
    id: "finance",
    label: "Finanzas",
    icon: CreditCard,
    children: [
      {
        id: "finance-overview",
        label: "Resumen",
        icon: BarChart3,
        href: "/finance"
      },
      {
        id: "finance-transactions",
        label: "Transacciones",
        icon: CreditCard,
        href: "/finance/transactions"
      }
    ]
  },
  {
    id: "reports",
    label: "Reportes",
    icon: FileText,
    href: "/reports"
  },
  {
    id: "calendar",
    label: "Calendario",
    icon: Calendar,
    href: "/calendar"
  },
  {
    id: "notifications",
    label: "Notificaciones",
    icon: Bell,
    badge: 3,
    href: "/notifications"
  },
  {
    id: "help",
    label: "Ayuda",
    icon: HelpCircle,
    href: "/help"
  },
  {
    id: "settings",
    label: "Configuración",
    icon: Settings,
    href: "/settings"
  }
];