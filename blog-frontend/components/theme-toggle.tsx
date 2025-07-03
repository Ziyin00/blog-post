// components/theme-toggle.tsx
"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react"; // A great icon library
import { useTheme } from "next-themes";

// To install lucide-react: npm install lucide-react

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <button
      className="theme-toggle"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      aria-label="Toggle theme"
    >
      <Sun className="sun-icon" />
      <Moon className="moon-icon" />
    </button>
  );
}
