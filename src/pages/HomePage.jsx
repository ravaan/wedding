import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Hero from '../components/sections/Hero';
import FloralDecoration from '../components/ui/FloralDecoration';
import { trackPageView, trackClick } from '../services/analytics';

const HomePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    trackPageView('Home');
  }, []);

  const sections = [
    {
      number: '01',
      title: 'Schedule',
      subtitle: 'Two days of celebration',
      path: '/events',
      description: 'Sangeet, Ceremony & Reception'
    },
    {
      number: '02',
      title: 'RSVP',
      subtitle: 'Confirm your attendance',
      path: '/rsvp',
      description: 'Let us know you\'ll be there',
      highlight: true
    },
    {
      number: '03',
      title: 'Travel',
      subtitle: 'Plan your journey',
      path: '/travel',
      description: 'Flights, Hotels & Transport'
    },
    {
      number: '04',
      title: 'Guide',
      subtitle: 'Ceremony traditions',
      path: '/ceremonies',
      description: 'Understanding our rituals'
    }
  ];

  const handleSectionClick = (section) => {
    trackClick('Section Card', { title: section.title, path: section.path });
    navigate(section.path);
  };

  return (
    <>
      <Hero />

      {/* Maximalist Sections */}
      <section className="bg-cream py-24 md:py-32 relative overflow-hidden">
        {/* Top floral border */}
        <div className="absolute top-0 left-0 right-0 pointer-events-none">
          <FloralDecoration variant="top-border" className="w-full h-20 md:h-28" />
        </div>

        {/* Side decorations */}
        <div className="absolute left-0 top-1/4 w-16 md:w-24 h-1/2 pointer-events-none hidden md:block opacity-70">
          <FloralDecoration variant="side-border" className="w-full h-full" />
        </div>
        <div className="absolute right-0 top-1/4 w-16 md:w-24 h-1/2 pointer-events-none hidden md:block opacity-70 rotate-180">
          <FloralDecoration variant="side-border" className="w-full h-full" />
        </div>

        <div className="max-w-screen-lg mx-auto px-6 lg:px-12 pt-12 relative z-10">
          <div className="space-y-px">
            {sections.map((section, index) => (
              <motion.div
                key={section.path}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                onClick={() => handleSectionClick(section)}
                className={`
                  group bg-cream border-b border-white/20 py-10 md:py-12 cursor-pointer transition-all duration-300
                  hover:pl-4 hover:bg-moss
                  ${section.highlight ? 'border-gold/50 border-b-2' : ''}
                `}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-baseline gap-6 md:gap-8">
                    <span className="text-gold font-light text-xs">
                      {section.number}
                    </span>
                    <div>
                      <h3 className={`text-xl md:text-2xl font-serif font-extralight mb-1 ${section.highlight ? 'text-white' : 'text-white'}`}>
                        {section.title}
                      </h3>
                      <p className="text-gold-light font-light text-xs uppercase tracking-[0.2em]">
                        {section.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    {section.highlight && (
                      <FloralDecoration variant="small-flower" className="w-6 h-6 hidden sm:block" />
                    )}
                    <ArrowRight
                      className={`transition-all duration-300 group-hover:translate-x-1 ${section.highlight ? 'text-white/70 group-hover:text-white' : 'text-white/50 group-hover:text-white'}`}
                      size={16}
                      strokeWidth={1}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Essential Information - Maximalist Style */}
      <section className="bg-cream py-24 md:py-32 border-t border-white/20 relative overflow-hidden">
        {/* Corner decorations */}
        <div className="absolute top-0 left-0 w-32 md:w-48 lg:w-64 h-auto pointer-events-none opacity-60">
          <FloralDecoration variant="corner-left" className="w-full h-auto" />
        </div>
        <div className="absolute top-0 right-0 w-32 md:w-48 lg:w-64 h-auto pointer-events-none opacity-60">
          <FloralDecoration variant="corner-right" className="w-full h-auto" />
        </div>

        <div className="max-w-screen-md mx-auto px-6 lg:px-12 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Elaborate floral divider */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="flex justify-center mb-10 md:mb-14"
            >
              <FloralDecoration variant="divider" className="w-56 md:w-72 lg:w-80 h-auto" />
            </motion.div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-extralight text-white mb-16 md:mb-20">
              Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
              <div>
                <p className="text-[10px] font-sans uppercase tracking-[0.3em] text-gold-light mb-3">
                  Venue
                </p>
                <p className="text-lg font-light text-white">
                  Taj Ambad
                </p>
              </div>

              <div>
                <p className="text-[10px] font-sans uppercase tracking-[0.3em] text-gold-light mb-3">
                  When
                </p>
                <p className="text-lg font-light text-white">
                  April 23—24, 2026
                </p>
              </div>

              <div>
                <p className="text-[10px] font-sans uppercase tracking-[0.3em] text-gold-light mb-3">
                  Where
                </p>
                <p className="text-lg font-light text-white">
                  Nashik, Maharashtra
                </p>
              </div>
            </div>

            <motion.button
              onClick={() => {
                trackClick('Details RSVP Button');
                navigate('/rsvp');
              }}
              className="btn-primary mt-16 md:mt-20"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              RSVP
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Closing Statement - Maximalist */}
      <section className="bg-cream py-24 md:py-32 border-t border-white/20 relative overflow-hidden">
        {/* Dense corner decorations */}
        <div className="absolute bottom-0 left-0 w-40 md:w-56 lg:w-72 h-auto pointer-events-none opacity-70 rotate-180">
          <FloralDecoration variant="corner-left" className="w-full h-auto" />
        </div>
        <div className="absolute bottom-0 right-0 w-40 md:w-56 lg:w-72 h-auto pointer-events-none opacity-70 rotate-180">
          <FloralDecoration variant="corner-right" className="w-full h-auto" />
        </div>
        <div className="absolute top-0 left-0 w-32 md:w-40 lg:w-48 h-auto pointer-events-none opacity-50">
          <FloralDecoration variant="corner-left" className="w-full h-auto" />
        </div>
        <div className="absolute top-0 right-0 w-32 md:w-40 lg:w-48 h-auto pointer-events-none opacity-50">
          <FloralDecoration variant="corner-right" className="w-full h-auto" />
        </div>

        {/* Frame corners */}
        <div className="absolute top-4 left-4 w-20 md:w-28 pointer-events-none opacity-60">
          <FloralDecoration variant="frame-corner" className="w-full h-auto" />
        </div>
        <div className="absolute top-4 right-4 w-20 md:w-28 pointer-events-none opacity-60 -scale-x-100">
          <FloralDecoration variant="frame-corner" className="w-full h-auto" />
        </div>
        <div className="absolute bottom-4 left-4 w-20 md:w-28 pointer-events-none opacity-60 -scale-y-100">
          <FloralDecoration variant="frame-corner" className="w-full h-auto" />
        </div>
        <div className="absolute bottom-4 right-4 w-20 md:w-28 pointer-events-none opacity-60 scale-[-1]">
          <FloralDecoration variant="frame-corner" className="w-full h-auto" />
        </div>

        <div className="max-w-screen-md mx-auto px-6 lg:px-12 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <FloralDecoration variant="small-flower" className="w-10 md:w-12 h-10 md:h-12 mx-auto mb-8" />
            <p className="text-xl md:text-2xl lg:text-3xl font-serif font-extralight leading-relaxed text-white">
              Your presence at our wedding
              <br />
              is the greatest gift of all
            </p>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="flex justify-center mt-8"
            >
              <FloralDecoration variant="divider" className="w-48 md:w-56 h-auto" />
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
