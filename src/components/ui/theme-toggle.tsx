"use client";

import { useEffect, useState } from "react";
import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="h-10 w-10" />;
  }

  const themes = [
    { value: "light", icon: Sun, label: "Claro" },
    { value: "dark", icon: Moon, label: "Oscuro" },
    { value: "system", icon: Monitor, label: "Sistema" },
  ] as const;

  const currentIndex = themes.findIndex((t) => t.value === theme);
  const nextIndex = (currentIndex + 1) % themes.length;
  const currentTheme = themes[currentIndex] || themes[0];
  const nextTheme = themes[nextIndex];

  const handleToggle = () => {
    setTheme(nextTheme.value);
  };

  const Icon = currentTheme.icon;

  return (
    <button
      onClick={handleToggle}
      className="cursor-pointer inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 w-10"
      title={`Tema actual: ${currentTheme.label}. Cambiar a: ${nextTheme.label}`}
    >
      <Icon className="h-[1.2rem] w-[1.2rem] transition-all" />
      <span className="sr-only">
        Cambiar tema a {nextTheme.label}
      </span>
    </button>
  );
}