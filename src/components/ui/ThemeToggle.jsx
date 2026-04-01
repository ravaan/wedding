import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, Sparkles } from "lucide-react";
import { useTheme, themes } from "../../context/ThemeContext";
import useClickPattern from "../../hooks/useClickPattern";
import { trackEvent } from "../../services/analytics";

const ThemeToggle = () => {
  const { theme, toggleTheme, activateWeedTheme, exitWeedTheme, isWeedTheme } =
    useTheme();
  const [showHint, setShowHint] = useState(false);

  const { handleClick, progress } = useClickPattern(
    [3, 2, 3],
    () => {
      activateWeedTheme();
      trackEvent("Easter Egg Activated", { type: "420 Mode" });
    },
    3000,
    { min: 500, max: 2000 },
  );

  const handleToggleClick = () => {
    handleClick();

    // Only toggle theme on single click if not in pattern
    if (progress.clicks === 1 && progress.currentPhase === 0) {
      setTimeout(() => {
        if (progress.clicks === 1 && !progress.isWaiting) {
          toggleTheme();
          trackEvent("Theme Changed", {
            to: theme === themes.dark ? "light" : "dark",
          });
        }
      }, 400);
    }
  };

  // Show hint feedback when pattern is being entered
  useEffect(() => {
    if (progress.feedback && progress.currentPhase > 0) {
      setShowHint(true);
      const timer = setTimeout(() => setShowHint(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [progress.feedback]);

  if (isWeedTheme) {
    return (
      <motion.button
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        onClick={exitWeedTheme}
        className="relative p-3 rounded-full bg-gradient-to-br from-green-400 via-green-500 to-green-600 text-white shadow-lg hover:shadow-green-500/50 transition-all duration-300"
        aria-label="Exit 420 mode"
      >
        <Sparkles size={20} className="animate-pulse" />
        <motion.div
          className="absolute inset-0 rounded-full bg-green-400 opacity-50"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.button>
    );
  }

  return (
    <div className="relative">
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={handleToggleClick}
        className={`
          relative p-3 rounded-full transition-all duration-300
          ${
            theme === themes.dark
              ? "bg-primary-800 text-primary-100 hover:bg-primary-700"
              : "bg-primary-50 text-primary-900 hover:bg-primary-100"
          }
          ${progress.currentPhase > 0 ? "ring-2 ring-green-500/30 animate-pulse" : ""}
        `}
        aria-label="Toggle theme"
      >
        <AnimatePresence mode="wait">
          {theme === themes.dark ? (
            <motion.div
              key="moon"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Moon size={18} strokeWidth={1.5} />
            </motion.div>
          ) : (
            <motion.div
              key="sun"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Sun size={18} strokeWidth={1.5} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pattern progress indicator */}
        {progress.currentPhase > 0 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full"
          >
            <span className="absolute inset-0 rounded-full bg-green-400 animate-ping" />
          </motion.div>
        )}
      </motion.button>

      {/* Hint feedback */}
      <AnimatePresence>
        {showHint && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full mt-2 right-0 px-3 py-1 bg-green-500 text-white text-xs rounded-lg whitespace-nowrap"
          >
            {progress.feedback}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ThemeToggle;
