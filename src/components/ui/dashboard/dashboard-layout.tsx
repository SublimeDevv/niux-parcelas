"use client";

import * as React from "react";
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
import { Header } from "./header";
import { Sidebar } from "./sidebar";
import { MenuItem } from "@/interfaces";
import { signOut } from "next-auth/react";

interface DashboardLayoutProps {
  children: React.ReactNode;
  userEmail?: string;
  userRole?: string;
  userName?: string;
  userImage?: string;
  notificationCount?: number;
}

const defaultMenuItems: MenuItem[] = [
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
        href: "/users"
      },
      {
        id: "users-roles",
        label: "Roles y Permisos",
        icon: Shield,
        href: "/users/roles"
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

export function DashboardLayout({
  children,
  userEmail = "juan@sublimedev.com",
  userRole = "Desarrollador Full Stack",
  userName = "Juan Diego",
  userImage = "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face",
  notificationCount = 3
}: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  const handleLogout = async () => {
    await signOut();
  };

  return (
    <div className="min-h-screen bg-background">
      <Header
        onMenuClick={() => setSidebarOpen(true)}
        logo="SublimeDev"
        userImage={userImage}
        userName={userName}
        notificationCount={notificationCount}
      />

      <div className="flex">
        <div className="hidden md:block md:w-80 md:shrink-0">
          <Sidebar
            items={defaultMenuItems}
            isOpen={true}
            onClose={() => {}}
            userEmail={userEmail}
            userRole={userRole}
            onLogout={handleLogout}
            className="relative"
          />
        </div>

        {/* MOBILEEE Sidebar */}
        <Sidebar
          items={defaultMenuItems}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          userEmail={userEmail}
          userRole={userRole}
          onLogout={handleLogout}
          className="md:hidden"
        />

        <main className="flex-1 overflow-hidden">
          <div className="h-[calc(100vh-4rem)] overflow-y-auto p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
