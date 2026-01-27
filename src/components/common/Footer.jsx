import React from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-primary-100">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-12 py-20">
        {/* Ultra minimal footer content */}
        <div className="text-center">
          <p className="text-[10px] font-light tracking-[0.4em] uppercase text-primary-400 mb-4">
            Prerna & Arpit
          </p>
          <p className="text-[10px] font-light tracking-[0.3em] uppercase text-primary-300">
            April 24—25, 2026 · Nashik
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;