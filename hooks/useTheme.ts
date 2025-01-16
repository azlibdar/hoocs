import { useCallback, useEffect, useState } from "react";

type Theme = "light" | "dark";

const useTheme = (defaultFirstTheme: Theme = "light") => {
  const [theme, setTheme] = useState<Theme>(() => {
    const storedTheme = localStorage.getItem("theme") as Theme | null;

    if (storedTheme) {
      return storedTheme;
    }

    return defaultFirstTheme;
  });

  useEffect(() => {
    const root = document.documentElement;

    const applyTheme = (theme: Theme) => {
      if (theme === "dark") {
        root.style.colorScheme = "dark";
        root.classList.add("dark");
        root.classList.remove("light");
      } else {
        root.style.colorScheme = "light";
        root.classList.add("light");
        root.classList.remove("dark");
      }

      root.setAttribute("data-theme", theme);
      localStorage.setItem("theme", theme);
    };

    applyTheme(theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  }, []);

  const changeTheme = useCallback((newTheme: Theme) => {
    setTheme(newTheme);
  }, []);

  return { theme, setTheme: changeTheme, toggleTheme };
};

export default useTheme;
