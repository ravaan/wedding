import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import content from '../data/content.json';
import { trackPageView } from '../services/analytics';

const CeremoniesPage = () => {
  useEffect(() => {
    trackPageView('Ceremonies');
  }, []);

  // Convert ceremonies object to array
  const ceremonies = Object.values(content.ceremonies || {}).map((ceremony, index) => ({
    name: ceremony.title,
    sanskrit_name: ceremony.titleHindi,
    description: ceremony.whatToExpect || ceremony.significance,
    significance: ceremony.significance
  }));

  // Get traditions if they exist, or use default
  const traditions = content.traditions || [
    { name: 'Mehndi', description: 'Traditional henna ceremony where intricate designs are applied to the bride\'s hands and feet.' },
    { name: 'Saptapadi', description: 'The seven sacred vows taken while walking around the holy fire.' },
    { name: 'Kanyadaan', description: 'The ceremonial giving away of the bride by her parents.' }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header - Full height with proper spacing */}
      <section className="min-h-screen flex items-center justify-center px-6 lg:px-12">
        <div className="max-w-screen-lg mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
            className="text-center"
          >
            <span className="text-label tracking-[0.3em] mb-12 block">
              WEDDING TRADITIONS
            </span>
            <h1 className="font-display text-6xl md:text-7xl lg:text-8xl font-light tracking-tight mb-8"
                style={{ fontVariationSettings: '"opsz" 72, "wght" 300' }}>
              Rituals
            </h1>
            <p className="lead">
              <em>Understanding our ceremonies</em>
            </p>
          </motion.div>
        </div>
      </section>

      {/* Ceremonies - Editorial Style */}
      <section className="py-20 md:py-32">
        <div className="max-w-screen-md mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          >
            <h2 className="font-display text-4xl lg:text-5xl font-light tracking-tight mb-16 text-center"
                style={{ fontVariationSettings: '"opsz" 48, "wght" 350' }}>
              Wedding Ceremonies
            </h2>

            <div className="space-y-20">
              {ceremonies.map((ceremony, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="border-t border-primary-100 pt-8"
                >
                  <div className="mb-8">
                    <h3 className="text-2xl font-serif font-light mb-3">
                      {ceremony.name}
                    </h3>
                    <p className="text-label text-xs opacity-60">
                      {ceremony.sanskrit_name}
                    </p>
                  </div>

                  <p className="text-base font-light text-primary-600 leading-relaxed mb-6">
                    {ceremony.description}
                  </p>

                  {ceremony.significance && ceremony.significance !== ceremony.description && (
                    <div className="mt-8">
                      <p className="text-label text-xs mb-3">SIGNIFICANCE</p>
                      <p className="text-sm font-light text-primary-600 leading-relaxed">
                        {ceremony.significance}
                      </p>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Traditions - Minimal */}
      <section className="py-20 md:py-32 border-t border-primary-100">
        <div className="max-w-screen-md mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          >
            <h2 className="font-display text-4xl lg:text-5xl font-light tracking-tight mb-16 text-center"
                style={{ fontVariationSettings: '"opsz" 48, "wght" 350' }}>
              Traditions & Customs
            </h2>

            <div className="space-y-12">
              {traditions.map((tradition, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center"
                >
                  <h3 className="text-xl font-serif font-light mb-4">
                    {tradition.name}
                  </h3>
                  <p className="text-sm font-light text-primary-600 leading-relaxed max-w-lg mx-auto">
                    {tradition.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Guest Guidelines - Minimal */}
      <section className="py-20 md:py-32 border-t border-primary-100">
        <div className="max-w-screen-sm mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            className="text-center"
          >
            <h2 className="font-display text-3xl font-light tracking-tight mb-12"
                style={{ fontVariationSettings: '"opsz" 36, "wght" 350' }}>
              For Our Guests
            </h2>

            <div className="space-y-8">
              <div>
                <p className="text-label text-xs mb-3">PARTICIPATION</p>
                <p className="text-sm font-light text-primary-600 leading-relaxed">
                  We warmly invite you to participate in our ceremonies.
                  Our families will guide you through each ritual.
                </p>
              </div>

              <div>
                <p className="text-label text-xs mb-3">PHOTOGRAPHY</p>
                <p className="text-sm font-light text-primary-600 leading-relaxed">
                  Feel free to capture moments, but please be respectful during the sacred ceremonies.
                </p>
              </div>

              <div>
                <p className="text-label text-xs mb-3">QUESTIONS</p>
                <p className="text-sm font-light text-primary-600 leading-relaxed">
                  Don't hesitate to ask our family members about any tradition you'd like to understand better.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default CeremoniesPage;