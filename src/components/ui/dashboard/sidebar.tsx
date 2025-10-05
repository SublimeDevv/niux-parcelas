"use client";

import * as React from "react";
import { ChevronDown, ChevronRight, LogOut, Mail, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { MenuItem } from "@/interfaces/MenuItem";
import { useRouter } from "next/navigation";
import { SidebarProps, SidebarItemProps } from "@/interfaces/Sidebar";

function SidebarItem({ item, level = 0, isActive = false, onItemClick }: SidebarItemProps) {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const hasChildren = item.children && item.children.length > 0;
  const Icon = item.icon;

  const handleClick = () => {
    if (hasChildren) {
      setIsExpanded(!isExpanded);
    } else {
      onItemClick?.(item);
    }
  };

  return (
    <div className="w-full">
      <button
        onClick={handleClick}
        className={cn(
          "w-full flex items-center gap-3 rounded-lg px-3 py-2 text-left text-sm font-medium transition-all hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          level > 0 && "ml-4",
          isActive && "bg-accent text-accent-foreground",
          level === 0 ? "text-sidebar-foreground" : "text-muted-foreground"
        )}
      >
        {Icon && (
          <Icon className={cn("h-4 w-4 shrink-0", level > 0 && "h-3 w-3")} />
        )}
        <span className="flex-1 truncate">{item.label}</span>
        
        {item.badge && (
          <span className="ml-auto rounded-full bg-primary px-2 py-0.5 text-xs text-primary-foreground">
            {item.badge}
          </span>
        )}
        
        {hasChildren && (
          <div className="ml-auto">
            {isExpanded ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </div>
        )}
      </button>

      {hasChildren && isExpanded && (
        <div className="mt-1 space-y-1">
          {item.children?.map((child) => (
            <SidebarItem
              key={child.id}
              item={child}
              level={level + 1}
              onItemClick={onItemClick}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export function Sidebar({
  items,
  isOpen,
  onClose,
  userEmail = "usuario@ejemplo.com",
  userRole = "Administrador",
  onLogout,
  className
}: SidebarProps) {
  
  const router = useRouter();

  const handleItemClick = (item: MenuItem) => {
    if (item.href) {
      router.push(item.href);
    }
    if (window.innerWidth < 768) {
      onClose();
    }
  };

  return (
    <>
      {/* Overlay para móvil */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-50 h-full w-80 transform border-r border-sidebar-border bg-sidebar transition-transform duration-300 ease-in-out md:relative md:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
          className
        )}
      >
        <div className="flex h-full flex-col">
          {/* Header del sidebar */}
          <div className="flex items-center justify-between border-b border-sidebar-border p-4 md:hidden">
            <h2 className="text-lg font-semibold text-sidebar-foreground">Menú</h2>
            <button
              onClick={onClose}
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground h-10 w-10"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 overflow-y-auto p-4">
            <div className="space-y-2">
              {items.map((item) => (
                <SidebarItem
                  key={item.id}
                  item={item}
                  onItemClick={handleItemClick}
                />
              ))}
            </div>
          </nav>

          {/* User Info & Logout */}
          <div className="border-t border-sidebar-border p-4">
            <div className="mb-4 space-y-1">
              <div className="flex items-center gap-2 text-sm">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="truncate text-sidebar-foreground">{userEmail}</span>
              </div>
              <div className="text-xs text-muted-foreground pl-6">{userRole}</div>
            </div>
            
            <button
              onClick={onLogout}
              className="w-full flex items-center gap-3 rounded-lg px-3 py-2 text-left text-sm font-medium text-destructive transition-all hover:bg-destructive/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <LogOut className="h-4 w-4" />
              <span>Cerrar Sesión</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
