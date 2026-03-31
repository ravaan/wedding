import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { trackClick } from "../../services/analytics";

const navItems = [
  { id: "home", label: "Home", path: "/" },
];

const Header = () => {
  const [showNav, setShowNav] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/" || location.pathname === "";

  useEffect(() => {
    if (isHome) {
      setShowNav(false);
      return;
    }
    setShowNav(true);
  }, [isHome]);

  return (
    <>
      {/* Desktop floating pill */}
      <motion.nav
        initial={{ x: "-50%", y: 60, opacity: 0 }}
        animate={{ x: "-50%", y: showNav ? 0 : 60, opacity: showNav ? 1 : 0 }}
        transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
        className="fixed bottom-6 left-1/2 z-50 hidden md:flex items-center gap-8 bg-white/80 backdrop-blur-md rounded-full px-8 py-2.5 shadow-sm border border-[var(--theme-gold)]/20"
      >
        {navItems.map((item) => (
          <Link
            key={item.id}
            to={item.path}
            onClick={() => trackClick("Navigation", { section: item.id })}
            className="relative"
          >
            <span
              className={`
                text-[11px] font-sans font-semibold uppercase tracking-[0.2em] transition-colors duration-300
                ${location.pathname === item.path ? "text-[var(--theme-gold)]" : "text-primary-600 hover:text-[var(--theme-gold)]"}
              `}
            >
              {item.label}
            </span>
            {location.pathname === item.path && (
              <motion.div
                layoutId="activePill"
                className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[var(--theme-gold)] rounded-full"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
          </Link>
        ))}
      </motion.nav>

      {/* Mobile floating button */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{
          scale: showNav ? 1 : 0,
          opacity: showNav ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
        className="fixed bottom-6 right-4 z-50 md:hidden rounded-full bg-white/90 backdrop-blur-md shadow-md border-2 border-[var(--theme-gold)]/40 flex items-center justify-center cursor-pointer px-4 py-2.5 gap-2"
        onClick={() => {
          window.scrollTo(0, 0);
          navigate("/");
        }}
        aria-label="Go home"
      >
        <span className="text-xs font-sans font-bold uppercase tracking-[0.15em] text-[var(--theme-green-dark)]">
          Home
        </span>
      </motion.button>

    </>
  );
};

export default Header;
