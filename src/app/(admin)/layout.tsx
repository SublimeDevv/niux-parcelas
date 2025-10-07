"use client";

import { DashboardLayout } from "@/components/ui/dashboard/dashboard-layout";
import { useSession } from "next-auth/react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();

  return (
    <DashboardLayout userName={session?.user.name} userEmail={session?.user.email} userRole={session?.user.role} >{children}</DashboardLayout>
  );
}