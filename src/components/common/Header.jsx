import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Heart, Calendar, MapPin, Users, Gift, Camera, MessageCircle, Globe } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import content from '../../data/content.json';
import { trackClick } from '../../services/analytics';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [language, setLanguage] = useState('en');
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home', icon: Heart },
    { path: '/events', label: 'Events', icon: Calendar },
    { path: '/travel', label: 'Travel & Stay', icon: MapPin },
    { path: '/rsvp', label: 'RSVP', icon: Users, highlight: true },
    { path: '/ceremonies', label: 'Traditions', icon: Gift },
    { path: '/gallery', label: 'Gallery', icon: Camera },
    { path: '/guestbook', label: 'Guest Book', icon: MessageCircle },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (item) => {
    trackClick('Navigation', { page: item.label, path: item.path });
    setIsMobileMenuOpen(false);
  };

  const toggleLanguage = () => {
    const newLang = language === 'en' ? 'hi' : 'en';
    setLanguage(newLang);
    trackClick('Language Toggle', { from: language, to: newLang });
  };

  const headerVariants = {
    initial: { y: -100 },
    animate: {
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 20
      }
    }
  };

  const logoVariants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: {
      opacity: 1,
      scale: 1,
      transition: { delay: 0.2, duration: 0.5 }
    }
  };

  return (
    <>
      <motion.header
        variants={headerVariants}
        initial="initial"
        animate="animate"
        className={`fixed top-0 w-full z-40 transition-all duration-500 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-lg py-3'
            : 'bg-gradient-to-b from-white/80 to-transparent py-5'
        }`}
      >
        <div className="container-custom mx-auto px-4">
          <nav className="flex items-center justify-between">
            {/* Logo/Names */}
            <Link to="/" onClick={() => handleNavClick({ label: 'Logo', path: '/' })}>
              <motion.div
                variants={logoVariants}
                className="flex items-center gap-2 group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="relative">
                  <Heart className="w-8 h-8 text-primary-400 fill-primary-200 group-hover:fill-primary-300 transition-colors" />
                  <motion.div
                    className="absolute -inset-1 bg-primary-200 rounded-full opacity-30"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.3, 0.1, 0.3]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                </div>
                <div className="hidden sm:block">
                  <h1 className="text-xl md:text-2xl font-display text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-accent-500">
                    {content.wedding.brideName.replace('[', '').replace(']', '')} & {content.wedding.groomName.replace('[', '').replace(']', '')}
                  </h1>
                  <p className="text-xs text-neutral-500 font-light">April 24-25, 2026</p>
                </div>
                <div className="sm:hidden">
                  <h1 className="text-lg font-display text-primary-500">B & G</h1>
                </div>
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item, index) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;

                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => handleNavClick(item)}
                  >
                    <motion.div
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 + 0.3 }}
                      className={`
                        relative px-4 py-2 rounded-lg transition-all duration-300 group
                        ${isActive
                          ? 'text-primary-600 bg-primary-50'
                          : 'text-neutral-600 hover:text-primary-600 hover:bg-primary-50/50'
                        }
                        ${item.highlight ? 'ml-2' : ''}
                      `}
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {item.highlight && (
                        <motion.span
                          className="absolute -top-2 -right-2 bg-gradient-to-r from-primary-400 to-accent-400 text-white text-xs px-2 py-0.5 rounded-full font-medium"
                          animate={{
                            scale: [1, 1.1, 1],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        >
                          RSVP Now
                        </motion.span>
                      )}
                      <div className="flex items-center gap-2">
                        <Icon size={16} />
                        <span className="font-medium">{item.label}</span>
                      </div>
                      {isActive && (
                        <motion.div
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-400 to-accent-400"
                          layoutId="activeTab"
                        />
                      )}
                    </motion.div>
                  </Link>
                );
              })}

              {/* Language Toggle */}
              <motion.button
                onClick={toggleLanguage}
                className="ml-4 p-2 rounded-lg bg-neutral-100 hover:bg-neutral-200 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <Globe size={20} className="text-neutral-600" />
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              className="lg:hidden p-2 rounded-lg hover:bg-neutral-100 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isMobileMenuOpen ? (
                <X size={24} className="text-neutral-700" />
              ) : (
                <Menu size={24} className="text-neutral-700" />
              )}
            </motion.button>
          </nav>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed right-0 top-0 h-full w-80 bg-white shadow-2xl z-40 lg:hidden overflow-y-auto"
            >
              <div className="p-6 pt-20">
                <div className="space-y-2">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.path;

                    return (
                      <Link
                        key={item.path}
                        to={item.path}
                        onClick={() => handleNavClick(item)}
                      >
                        <motion.div
                          className={`
                            flex items-center gap-3 px-4 py-3 rounded-lg transition-all
                            ${isActive
                              ? 'bg-primary-100 text-primary-700'
                              : 'text-neutral-700 hover:bg-neutral-50'
                            }
                            ${item.highlight ? 'bg-gradient-to-r from-primary-50 to-accent-50 border border-primary-200' : ''}
                          `}
                          whileHover={{ x: 5 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Icon size={20} />
                          <span className="font-medium text-lg">{item.label}</span>
                          {item.highlight && (
                            <span className="ml-auto text-xs bg-primary-400 text-white px-2 py-1 rounded-full">
                              Now
                            </span>
                          )}
                        </motion.div>
                      </Link>
                    );
                  })}
                </div>

                {/* Language Toggle in Mobile */}
                <motion.button
                  onClick={toggleLanguage}
                  className="mt-6 w-full p-3 rounded-lg bg-neutral-100 hover:bg-neutral-200 transition-colors flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Globe size={20} />
                  <span className="font-medium">
                    {language === 'en' ? 'हिंदी' : 'English'}
                  </span>
                </motion.button>

                {/* Wedding Info in Mobile */}
                <div className="mt-8 p-4 bg-gradient-to-br from-primary-50 to-accent-50 rounded-lg">
                  <p className="text-sm text-neutral-600 mb-1">Save the Date</p>
                  <p className="font-serif text-lg text-primary-700">April 24-25, 2026</p>
                  <p className="text-sm text-neutral-600 mt-1">{content.wedding.location}</p>
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