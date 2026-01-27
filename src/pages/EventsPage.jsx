import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock } from 'lucide-react';
import content from '../data/content.json';
import { trackPageView } from '../services/analytics';

const EventsPage = () => {
  useEffect(() => {
    trackPageView('Events');
  }, []);

  const allEvents = [
    ...content.events.day1.events.map(event => ({
      ...event,
      date: content.events.day1.date || 'April 23, 2026'
    })),
    ...content.events.day2.events.map(event => ({
      ...event,
      date: content.events.day2.date || 'April 24, 2026'
    }))
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
              WEDDING SCHEDULE
            </span>
            <h1 className="font-display text-6xl md:text-7xl lg:text-8xl font-light tracking-tight mb-8"
                style={{ fontVariationSettings: '"opsz" 72, "wght" 300' }}>
              Two Days
            </h1>
            <p className="lead">
              <em>Sangeet, Ceremony & Reception</em>
            </p>
          </motion.div>
        </div>
      </section>

      {/* Timeline - Properly spaced sections */}
      <section className="py-20 md:py-32">
        <div className="max-w-screen-md mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          >
            {/* Day 1 Section */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              className="text-center mb-20 md:mb-32"
            >
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-light tracking-tight mb-4"
                  style={{ fontVariationSettings: '"opsz" 48, "wght" 350' }}>
                Day One
              </h2>
              <p className="text-label text-xs">APRIL 23, 2026</p>
            </motion.div>

            {/* Day 1 Events */}
            <div className="space-y-16 md:space-y-20 mb-32 md:mb-48">
              {content.events.day1.events.map((event, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="relative"
                >
                  <div className="grid md:grid-cols-3 gap-6 md:gap-8">
                    <div className="md:text-right">
                      <p className="font-display text-2xl md:text-3xl font-light"
                         style={{ fontVariationSettings: '"opsz" 36, "wght" 350' }}>
                        {event.time}
                      </p>
                    </div>

                    <div className="md:col-span-2">
                      <h3 className="text-xl md:text-2xl font-serif font-light mb-4">
                        {event.name}
                      </h3>
                      <p className="text-sm md:text-base font-light text-primary-600 leading-relaxed mb-6">
                        {event.description}
                      </p>

                      <div className="space-y-2">
                        <p className="text-caption flex items-center gap-2">
                          <MapPin size={12} strokeWidth={1.5} className="text-primary-400" />
                          <span className="text-xs">{event.venue}</span>
                        </p>
                        {event.dress_code && (
                          <p className="text-caption text-xs">
                            Attire: {event.dress_code}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Day 2 Section */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              className="text-center mb-20 md:mb-32"
            >
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-light tracking-tight mb-4"
                  style={{ fontVariationSettings: '"opsz" 48, "wght" 350' }}>
                Day Two
              </h2>
              <p className="text-label text-xs">APRIL 24, 2026</p>
            </motion.div>

            {/* Day 2 Events */}
            <div className="space-y-16 md:space-y-20">
              {content.events.day2.events.map((event, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="relative"
                >
                  <div className="grid md:grid-cols-3 gap-6 md:gap-8">
                    <div className="md:text-right">
                      <p className="font-display text-2xl md:text-3xl font-light"
                         style={{ fontVariationSettings: '"opsz" 36, "wght" 350' }}>
                        {event.time}
                      </p>
                    </div>

                    <div className="md:col-span-2">
                      <h3 className="text-xl md:text-2xl font-serif font-light mb-4">
                        {event.name}
                      </h3>
                      <p className="text-sm md:text-base font-light text-primary-600 leading-relaxed mb-6">
                        {event.description}
                      </p>

                      <div className="space-y-2">
                        <p className="text-caption flex items-center gap-2">
                          <MapPin size={12} strokeWidth={1.5} className="text-primary-400" />
                          <span className="text-xs">{event.venue}</span>
                        </p>
                        {event.dress_code && (
                          <p className="text-caption text-xs">
                            Attire: {event.dress_code}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Venue Information - Properly spaced */}
      <section className="py-20 md:py-32 border-t border-primary-100">
        <div className="max-w-screen-sm mx-auto px-6 lg:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          >
            <h2 className="font-display text-2xl md:text-3xl font-light tracking-tight mb-8 md:mb-12"
                style={{ fontVariationSettings: '"opsz" 36, "wght" 350' }}>
              Venue
            </h2>

            <div className="space-y-4">
              <p className="text-base md:text-lg font-light">
                {content.venue.name}
              </p>
              <p className="text-caption text-sm">
                {content.venue.address}
              </p>
              <p className="text-caption mt-6 text-sm">
                Complimentary valet parking available
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default EventsPage;