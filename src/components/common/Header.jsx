import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { trackClick } from "../../services/analytics";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showNav, setShowNav] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/events", label: "Schedule" },
    { path: "/travel", label: "Travel" },
    { path: "/rsvp", label: "RSVP", highlight: true },
    { path: "/ceremonies", label: "Guide" },
  ];

  useEffect(() => {
    if (!isHome) {
      setShowNav(true);
      return;
    }

    setShowNav(false);

    const handleScroll = () => {
      setShowNav(window.scrollY > window.innerHeight * 0.8);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome]);

  const handleNavClick = (item) => {
    trackClick("Navigation", { page: item.label, path: item.path });
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: showNav ? 0 : -100 }}
        transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
        className="fixed top-0 w-full z-50 bg-primary-500 border-b-4 border-orange shadow-lg"
      >
        <nav className="max-w-screen-2xl mx-auto px-6 lg:px-12 py-5 flex items-center justify-between">
          {/* Logo/Date */}
          <Link
            to="/"
            onClick={() => handleNavClick({ label: "Logo", path: "/" })}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400 }}
              className="flex flex-col gap-0.5"
            >
              <span className="font-script text-3xl text-[#E8C84A]">P & A</span>
              <span className="text-[9px] font-sans font-bold uppercase tracking-[0.3em] text-cream/70">
                04.24 — 25.26
              </span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-10 lg:gap-14">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => handleNavClick(item)}
                  className="relative group"
                >
                  <span
                    className={`
                      text-xs font-sans font-bold uppercase tracking-[0.25em] transition-all duration-300
                      ${isActive ? "text-[#E8C84A]" : "text-cream/80 hover:text-[#E8C84A]"}
                      ${item.highlight ? "font-extrabold" : ""}
                    `}
                  >
                    {item.label}
                  </span>
                  {isActive && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute -bottom-2 left-0 right-0 h-[3px] bg-orange"
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 30,
                      }}
                    />
                  )}
                  {!isActive && (
                    <span className="absolute -bottom-2 left-0 right-0 h-[2px] bg-orange/60 scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 cursor-pointer"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <motion.div
              animate={{ rotate: isMobileMenuOpen ? 90 : 0 }}
              transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            >
              {isMobileMenuOpen ? (
                <X size={22} strokeWidth={2} className="text-cream" />
              ) : (
                <Menu size={22} strokeWidth={2} className="text-cream" />
              )}
            </motion.div>
          </button>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-primary-900/30 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed right-0 top-0 h-full w-72 bg-primary-500 border-l-4 border-orange shadow-2xl z-40 md:hidden"
            >
              <div className="pt-24 px-8">
                <div className="space-y-6">
                  {navItems.map((item, index) => {
                    const isActive = location.pathname === item.path;

                    return (
                      <Link
                        key={item.path}
                        to={item.path}
                        onClick={() => handleNavClick(item)}
                      >
                        <motion.div
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className={`
                            text-lg font-sans font-semibold
                            ${isActive ? "text-[#E8C84A]" : "text-cream/80"}
                            ${item.highlight ? "font-bold" : ""}
                            transition-all duration-300 hover:translate-x-2 hover:text-orange
                          `}
                        >
                          {item.label}
                        </motion.div>
                      </Link>
                    );
                  })}
                </div>

                <div className="mt-20 pt-8 border-t-2 border-orange/50">
                  <p className="text-xs font-sans font-bold uppercase tracking-[0.3em] text-cream/60">
                    APRIL 24 — 25, 2026
                  </p>
                  <p className="text-xs font-sans font-bold uppercase tracking-[0.3em] text-cream/60 mt-2">
                    NASHIK, MAHARASHTRA
                  </p>
                  <div className="mt-8">
                    <p className="font-script text-3xl text-[#E8C84A]">
                      Prerna & Arpit
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
