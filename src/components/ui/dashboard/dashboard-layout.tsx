"use client";

import * as React from "react";
import { Header } from "./header";
import { Sidebar } from "./sidebar";
import { signOut } from "next-auth/react";
import { defaultMenuItems } from "@/configs/routes/sidebar/menu-dashboard";

interface DashboardLayoutProps {
  children: React.ReactNode;
  userEmail?: string;
  userRole?: string;
  userName?: string;
  userImage?: string;
  notificationCount?: number;
}


export function DashboardLayout({
  children,
  userEmail = "Cargando...",
  userRole = "Cargando...",
  userName = "Cargando...",
  userImage = "https://ui-avatars.com/api/?name="+userName+"&background=0D8ABC&color=fff",
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
        logo="Niux Parcelas"
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