"use client";

import * as React from "react";
import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const themes = [
    { value: 'light', icon: Sun, label: 'Claro' },
    { value: 'dark', icon: Moon, label: 'Oscuro' },
    { value: 'system', icon: Monitor, label: 'Sistema' }
  ] as const;

  const cycleTheme = () => {
    const currentIndex = themes.findIndex(t => t.value === theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex].value);
  };

  const currentTheme = themes.find(t => t.value === theme);
  const Icon = currentTheme?.icon || Sun;

  return (
    <button
      onClick={cycleTheme}
      className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 w-10"
      title={`Cambiar tema (actual: ${currentTheme?.label})`}
    >
      <Icon className="h-[1.2rem] w-[1.2rem] transition-all" />
      <span className="sr-only">Cambiar tema</span>
    </button>
  );
}
