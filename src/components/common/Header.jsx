import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { trackClick } from '../../services/analytics';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/events', label: 'Schedule' },
    { path: '/travel', label: 'Travel' },
    { path: '/rsvp', label: 'RSVP', highlight: true },
    { path: '/ceremonies', label: 'Guide' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (item) => {
    trackClick('Navigation', { page: item.label, path: item.path });
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
        className={`fixed top-0 w-full z-50 transition-all duration-700 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md border-b border-primary-50'
            : 'bg-transparent'
        }`}
      >
        <nav className="max-w-screen-2xl mx-auto px-6 lg:px-12 py-6 flex items-center justify-between">
          {/* Logo/Date */}
          <Link
            to="/"
            onClick={() => handleNavClick({ label: 'Logo', path: '/' })}
            className="text-primary-900"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400 }}
              className="flex flex-col gap-0.5"
            >
              <span className="font-display text-lg font-medium tracking-tight"
                    style={{ fontVariationSettings: '"opsz" 24, "wght" 500' }}>
                P & A
              </span>
              <span className="text-label text-[9px] opacity-70">
                04.24—25.26
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
                      text-label transition-all duration-300
                      ${isActive
                        ? 'text-primary-900'
                        : 'text-primary-500 hover:text-primary-900'
                      }
                      ${item.highlight ? 'font-medium' : ''}
                    `}
                  >
                    {item.label}
                  </span>
                  {isActive && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute -bottom-2 left-0 right-0 h-[1.5px] bg-primary-900"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  {!isActive && (
                    <span className="absolute -bottom-2 left-0 right-0 h-[1px] bg-primary-900 scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <motion.div
              animate={{ rotate: isMobileMenuOpen ? 90 : 0 }}
              transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            >
              {isMobileMenuOpen ? (
                <X size={20} strokeWidth={1.5} className="text-primary-900" />
              ) : (
                <Menu size={20} strokeWidth={1.5} className="text-primary-900" />
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
              className="fixed inset-0 bg-primary-900/10 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed right-0 top-0 h-full w-72 bg-white shadow-2xl z-40 md:hidden"
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
                            text-lg font-sans
                            ${isActive ? 'text-primary-900 font-medium' : 'text-primary-600 font-normal'}
                            ${item.highlight ? 'font-medium' : ''}
                            transition-all duration-300 hover:translate-x-2
                          `}
                        >
                          {item.label}
                        </motion.div>
                      </Link>
                    );
                  })}
                </div>

                <div className="mt-20 pt-8 border-t border-primary-100">
                  <p className="text-label text-xs opacity-60">
                    APRIL 24—25, 2026
                  </p>
                  <p className="text-label text-xs opacity-60 mt-2">
                    NASHIK, MAHARASHTRA
                  </p>
                  <div className="mt-8">
                    <p className="font-serif italic text-sm text-primary-500">
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