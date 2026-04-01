import React, { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export const themes = {
  light: "light",
  dark: "dark",
  weed: "weed",
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    // Check localStorage for saved theme
    const savedTheme = localStorage.getItem("wedding-theme");
    // Don't persist weed theme on reload
    if (savedTheme === themes.weed) {
      return themes.light;
    }
    return savedTheme || themes.light;
  });

  const [weedThemeTimeout, setWeedThemeTimeout] = useState(null);

  useEffect(() => {
    // Update document class and localStorage
    document.documentElement.className = theme;
    if (theme !== themes.weed) {
      localStorage.setItem("wedding-theme", theme);
    }

    // Auto-expire weed theme after 10 minutes
    if (theme === themes.weed) {
      const timeout = setTimeout(
        () => {
          const previousTheme =
            localStorage.getItem("wedding-theme") || themes.light;
          setTheme(previousTheme);
        },
        10 * 60 * 1000,
      ); // 10 minutes
      setWeedThemeTimeout(timeout);
    } else if (weedThemeTimeout) {
      clearTimeout(weedThemeTimeout);
      setWeedThemeTimeout(null);
    }

    return () => {
      if (weedThemeTimeout) {
        clearTimeout(weedThemeTimeout);
      }
    };
  }, [theme]);

  const toggleTheme = () => {
    if (theme === themes.light) {
      setTheme(themes.dark);
    } else if (theme === themes.dark) {
      setTheme(themes.light);
    } else {
      // Exit weed theme to previous saved theme
      const previousTheme =
        localStorage.getItem("wedding-theme") || themes.light;
      setTheme(previousTheme);
    }
  };

  const activateWeedTheme = () => {
    setTheme(themes.weed);
  };

  const exitWeedTheme = () => {
    const previousTheme = localStorage.getItem("wedding-theme") || themes.light;
    setTheme(previousTheme);
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        toggleTheme,
        activateWeedTheme,
        exitWeedTheme,
        isWeedTheme: theme === themes.weed,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
