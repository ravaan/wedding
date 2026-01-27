import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Hero from '../components/sections/Hero';
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

      {/* Minimal Sections */}
      <section className="bg-white py-32">
        <div className="max-w-screen-lg mx-auto px-6 lg:px-12">
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
                  group bg-white border-b border-primary-100 py-12 cursor-pointer transition-all duration-300
                  hover:pl-4
                  ${section.highlight ? 'border-primary-300' : ''}
                `}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-baseline gap-8">
                    <span className="text-primary-300 font-light text-xs">
                      {section.number}
                    </span>
                    <div>
                      <h3 className="text-2xl font-serif font-extralight text-primary-900 mb-1">
                        {section.title}
                      </h3>
                      <p className="text-primary-400 font-light text-xs uppercase tracking-[0.2em]">
                        {section.description}
                      </p>
                    </div>
                  </div>

                  <ArrowRight
                    className="text-primary-300 group-hover:text-primary-900 transition-all duration-300 group-hover:translate-x-1"
                    size={16}
                    strokeWidth={1}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Essential Information - Ultra Minimal */}
      <section className="bg-white py-32 border-t border-primary-100">
        <div className="max-w-screen-md mx-auto px-6 lg:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl lg:text-5xl font-serif font-extralight text-primary-900 mb-20">
              Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div>
                <p className="text-[10px] font-sans uppercase tracking-[0.3em] text-primary-400 mb-3">
                  Venue
                </p>
                <p className="text-lg font-light text-primary-900">
                  Taj Ambad
                </p>
              </div>

              <div>
                <p className="text-[10px] font-sans uppercase tracking-[0.3em] text-primary-400 mb-3">
                  When
                </p>
                <p className="text-lg font-light text-primary-900">
                  April 23—24, 2026
                </p>
              </div>

              <div>
                <p className="text-[10px] font-sans uppercase tracking-[0.3em] text-primary-400 mb-3">
                  Where
                </p>
                <p className="text-lg font-light text-primary-900">
                  Nashik, Maharashtra
                </p>
              </div>
            </div>

            <motion.button
              onClick={() => {
                trackClick('Details RSVP Button');
                navigate('/rsvp');
              }}
              className="btn-primary mt-20"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              RSVP
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Closing Statement */}
      <section className="bg-white py-32 border-t border-primary-100">
        <div className="max-w-screen-md mx-auto px-6 lg:px-12 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <p className="text-2xl lg:text-3xl font-serif font-extralight leading-relaxed text-primary-900">
              Your presence at our wedding
              <br />
              is the greatest gift of all
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default HomePage;