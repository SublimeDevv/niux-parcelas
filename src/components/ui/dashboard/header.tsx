"use client";

import Image from "next/image";
import { Menu } from "lucide-react";
import { ThemeToggle } from "../theme-toggle";

interface HeaderProps {
  onMenuClick?: () => void;
  logo?: string | React.ReactNode;
  userImage?: string;
  userName?: string;
  notificationCount?: number;
}

export function Header({ 
  onMenuClick, 
  logo = "Niux Parcelas", 
  userName = "Usuario",
  userImage="https://ui-avatars.com/api/?name="+userName+"&background=0D8ABC&color=fff"
  //notificationCount = 0
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 w-10 md:hidden"
            aria-label="Abrir menú"
          >
            <Menu className="h-5 w-5" />
          </button>
          
          <div className="flex items-center gap-2">
            {typeof logo === 'string' ? (
              <h1 className="text-xl font-bold text-primary">{logo}</h1>
            ) : (
              logo
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          
          {/* <div className="relative">
            <button
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 w-10"
              aria-label="Notificaciones"
            >
              <Bell className="h-[1.2rem] w-[1.2rem]" />
              {notificationCount > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-destructive text-destructive-foreground text-xs flex items-center justify-center">
                  {notificationCount > 99 ? '99+' : notificationCount}
                </span>
              )}
            </button>
          </div> */}

          <div className="flex items-center gap-2">
            <div className="relative h-8 w-8 rounded-full overflow-hidden ring-2 ring-border">
              <Image
                src={userImage}
                alt={`Foto de perfil de ${userName}`}
                fill
                className="object-cover"
                sizes="32px"
              />
            </div>
            <span className="hidden md:inline-block text-sm font-medium text-foreground">
              {userName}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
