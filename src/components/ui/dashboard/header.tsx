"use client";

import Image from "next/image";
import { Menu } from "lucide-react";
import { ThemeToggle } from "../theme-toggle";
import { useMemo } from "react";

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
  userImage
}: HeaderProps) {
  const avatarUrl = useMemo(() => {
    if (userImage) return userImage;
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}&background=0D8ABC&color=fff`;
  }, [userImage, userName]);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          {onMenuClick && (
            <button
              onClick={onMenuClick}
              className="inline-flex items-center justify-center rounded-md transition-colors hover:bg-accent hover:text-accent-foreground h-10 w-10 md:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label="Abrir menú"
              type="button"
            >
              <Menu className="h-5 w-5" />
            </button>
          )}
          
          {typeof logo === 'string' ? (
            <h1 className="text-xl font-bold text-primary">{logo}</h1>
          ) : (
            logo
          )}
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3">
          <ThemeToggle />
          
          {/* User Profile */}
          <div className="flex items-center gap-2">
            <div className="relative h-8 w-8 rounded-full overflow-hidden ring-2 ring-border flex-shrink-0">
              <Image
                src={avatarUrl}
                alt={userName}
                width={32}
                height={32}
                className="object-cover"
                unoptimized={avatarUrl.includes('ui-avatars.com')}
                priority
              />
            </div>
            <span className="hidden md:inline-block text-sm font-medium">
              {userName}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}