
"use client"

import type { ReactNode } from 'react'
import { createContext, useContext, useEffect, useState } from 'react'

type Theme = "dark" | "light" | "system"

type ThemeProviderProps = {
  children: ReactNode
  defaultTheme?: Theme
  storageKey?: string
}

type ThemeProviderState = {
  theme: Theme
  setTheme: (theme: Theme) => void
  resolvedTheme?: "dark" | "light"
}

const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
  resolvedTheme: "light", // Default guess
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "occasion-stays-theme",
}: ThemeProviderProps) {
  // Initialize theme state safely for SSR and client
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === "undefined") {
      return defaultTheme; // SSR fallback
    }
    return (localStorage.getItem(storageKey) as Theme) || defaultTheme;
  });

  // Initialize resolvedTheme based on the initial theme
  const [resolvedTheme, setResolvedTheme] = useState<"dark" | "light">(() => {
    let initialEffectiveTheme: Theme | "dark" | "light" = theme;
    if (theme === "system") {
      if (typeof window !== "undefined") {
        initialEffectiveTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      } else {
        initialEffectiveTheme = "light"; // SSR fallback for system theme
      }
    }
    return initialEffectiveTheme as "dark" | "light";
  });

  // Effect to load theme from localStorage on client mount
  useEffect(() => {
    const storedTheme = localStorage.getItem(storageKey) as Theme | null;
    if (storedTheme) {
      setTheme(storedTheme);
    }
    // No else needed, as useState already initializes with defaultTheme if storedTheme is null
  }, [storageKey, defaultTheme]);

  // Effect to apply theme to DOM and update resolvedTheme
  useEffect(() => {
    if (typeof window === "undefined") return;

    const root = window.document.documentElement;
    root.classList.remove("light", "dark");

    let currentAppliedTheme: "dark" | "light";
    if (theme === "system") {
      currentAppliedTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    } else {
      currentAppliedTheme = theme;
    }
    root.classList.add(currentAppliedTheme);
    setResolvedTheme(currentAppliedTheme);
  }, [theme]);

  // Effect for system theme changes
  useEffect(() => {
    if (typeof window === "undefined" || theme !== "system") return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e: MediaQueryListEvent) => {
        const systemIsDark = e.matches;
        const newSystemTheme = systemIsDark ? "dark" : "light";
        document.documentElement.classList.remove("light", "dark");
        document.documentElement.classList.add(newSystemTheme);
        setResolvedTheme(newSystemTheme); // Update resolvedTheme when system theme changes
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [theme]);


  const value = {
    theme,
    setTheme: (newTheme: Theme) => {
      if (typeof window !== 'undefined') {
        localStorage.setItem(storageKey, newTheme)
      }
      setTheme(newTheme)
    },
    resolvedTheme,
  }

  return (
    <ThemeProviderContext.Provider value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider")

  return context
}
