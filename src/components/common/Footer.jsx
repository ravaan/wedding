import React from 'react';
import { motion } from 'framer-motion';
import FloralDecoration from '../ui/FloralDecoration';

const Footer = () => {
  return (
    <footer className="bg-cream border-t border-white/20 relative overflow-hidden">
      {/* Top floral border */}
      <div className="absolute top-0 left-0 right-0 pointer-events-none">
        <FloralDecoration variant="top-border" className="w-full h-20 md:h-28" />
      </div>

      {/* Corner decorations */}
      <div className="absolute bottom-0 left-0 w-40 md:w-56 lg:w-72 h-auto pointer-events-none opacity-60 rotate-180">
        <FloralDecoration variant="corner-left" className="w-full h-auto" />
      </div>
      <div className="absolute bottom-0 right-0 w-40 md:w-56 lg:w-72 h-auto pointer-events-none opacity-60 rotate-180">
        <FloralDecoration variant="corner-right" className="w-full h-auto" />
      </div>

      {/* Frame corners */}
      <div className="absolute top-4 left-4 w-16 md:w-24 pointer-events-none opacity-50">
        <FloralDecoration variant="frame-corner" className="w-full h-auto" />
      </div>
      <div className="absolute top-4 right-4 w-16 md:w-24 pointer-events-none opacity-50 -scale-x-100">
        <FloralDecoration variant="frame-corner" className="w-full h-auto" />
      </div>

      <div className="max-w-screen-xl mx-auto px-6 lg:px-12 py-28 md:py-32 pt-32 md:pt-36 relative">
        {/* Maximalist footer content */}
        <div className="text-center flex flex-col items-center">
          {/* Elaborate floral divider */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <FloralDecoration variant="divider" className="w-56 md:w-72 h-auto" />
          </motion.div>

          <motion.img
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            src={`${import.meta.env.BASE_URL}logo.png`}
            alt="Prerna & Arpit"
            className="h-28 md:h-32 w-auto mb-6"
          />

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-[10px] font-light tracking-[0.3em] uppercase text-white/80"
          >
            April 23—24, 2026 · Nashik
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-6"
          >
            <FloralDecoration variant="small-flower" className="w-8 h-8" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-[9px] font-light tracking-[0.2em] uppercase text-gold-light mt-4"
          >
            With love, Prerna & Arpit
          </motion.p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
