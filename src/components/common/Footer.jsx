import React from "react";
import Divider from "../ui/Divider";
import "studio-typo-widget";

const Footer = () => {
  return (
    <footer className="bg-[var(--theme-green-dark)] border-t-4 border-[var(--theme-gold)] relative overflow-hidden">
      {/* Batik pattern overlay on footer */}
      <div className="absolute inset-0 batik-bg opacity-30" />
      <div className="max-w-screen-xl mx-auto px-6 lg:px-12 py-16 relative z-10">
        <div className="flex justify-center mb-8">
          <Divider motif="floral" />
        </div>
        <div className="text-center">
          <p className="font-script text-4xl text-[var(--theme-gold-light)] mb-4">
            Prerna & Arpit
          </p>
          <p className="text-[10px] font-sans font-bold tracking-[0.3em] uppercase text-white/70">
            April 23 — 24, 2026 · Nashik
          </p>
        </div>
        <div className="flex justify-center mt-8 opacity-50 hover:opacity-80 transition-opacity">
          <studio-typo size="small" theme="dark" speed="1.2"></studio-typo>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
