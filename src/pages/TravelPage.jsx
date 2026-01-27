import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plane, Train, Car, ArrowRight } from 'lucide-react';
import content from '../data/content.json';
import { trackPageView, trackExternalLink } from '../services/analytics';

const TravelPage = () => {
  useEffect(() => {
    trackPageView('Travel');
  }, []);

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
              TRAVEL INFORMATION
            </span>
            <h1 className="font-display text-6xl md:text-7xl lg:text-8xl font-light tracking-tight mb-8"
                style={{ fontVariationSettings: '"opsz" 72, "wght" 300' }}>
              Getting There
            </h1>
            <p className="lead">
              <em>Nashik, Maharashtra</em>
            </p>
          </motion.div>
        </div>
      </section>

      {/* Transportation Options - Editorial Style */}
      <section className="py-20 md:py-32">
        <div className="max-w-screen-md mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [.23, 1, .32, 1] }}
            className="space-y-20"
          >
            {/* By Air */}
            <div className="border-t border-primary-100 pt-8">
              <div className="flex items-start gap-4 mb-6">
                <Plane className="w-4 h-4 text-primary-400 mt-1" strokeWidth={1} />
                <h3 className="text-label">BY AIR</h3>
              </div>
              <div className="ml-8 space-y-4">
                <p className="text-lg font-light leading-relaxed">
                  Nashik Airport (ISK) · 26 km from venue
                </p>
                <p className="text-caption">
                  Direct IndiGo flights available from Delhi, Bangalore, Ahmedabad, and Goa.
                  Alternative option: Mumbai Airport (180km).
                </p>
              </div>
            </div>

            {/* By Train */}
            <div className="border-t border-primary-100 pt-8">
              <div className="flex items-start gap-4 mb-6">
                <Train className="w-4 h-4 text-primary-400 mt-1" strokeWidth={1} />
                <h3 className="text-label">BY TRAIN</h3>
              </div>
              <div className="ml-8 space-y-4">
                <p className="text-lg font-light leading-relaxed">
                  Nashik Road Station · 12 km from venue
                </p>
                <p className="text-caption">
                  Well-connected railway junction with direct trains from all major cities.
                  Frequent connectivity from Mumbai, Delhi, and Bangalore.
                </p>
              </div>
            </div>

            {/* By Road */}
            <div className="border-t border-primary-100 pt-8">
              <div className="flex items-start gap-4 mb-6">
                <Car className="w-4 h-4 text-primary-400 mt-1" strokeWidth={1} />
                <h3 className="text-label">BY ROAD</h3>
              </div>
              <div className="ml-8 space-y-4">
                <p className="text-lg font-light leading-relaxed">
                  Mumbai-Nashik: 180 km · 3-4 hours
                </p>
                <p className="text-caption">
                  Well-connected by highways. Pune-Nashik: 210 km (4-5 hours).
                  Taxi and bus services readily available.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* From Major Cities - Minimal Editorial */}
      <section className="py-20 md:py-32">
        <div className="max-w-screen-md mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          >
            <h2 className="font-display text-4xl lg:text-5xl font-light tracking-tight mb-16 text-center"
                style={{ fontVariationSettings: '"opsz" 48, "wght" 350' }}>
              From Major Cities
            </h2>

            <div className="space-y-16">
              {/* Delhi */}
              <motion.div
                className="group"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h3 className="text-2xl font-serif font-light mb-6">Delhi</h3>
                <div className="grid md:grid-cols-2 gap-8 text-sm">
                  <div>
                    <p className="text-label text-xs mb-3">FLIGHT</p>
                    <p className="font-light leading-relaxed mb-2">
                      IndiGo 6E2036 · Direct · 2 hours
                    </p>
                    <p className="text-caption mb-4">Daily at 06:55</p>
                    <a
                      href="https://www.goindigo.in/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-elegant text-primary-600 text-xs uppercase tracking-wider"
                    >
                      Book Flight
                    </a>
                  </div>
                  <div>
                    <p className="text-label text-xs mb-3">TRAIN</p>
                    <p className="font-light leading-relaxed mb-2">
                      Punjab Mail · CSMT Rajdhani
                    </p>
                    <p className="text-caption mb-4">18-22 hours · 1355 km</p>
                    <a
                      href="https://www.irctc.co.in/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-elegant text-primary-600 text-xs uppercase tracking-wider"
                    >
                      Book Train
                    </a>
                  </div>
                </div>
              </motion.div>

              {/* Bangalore */}
              <motion.div
                className="group"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h3 className="text-2xl font-serif font-light mb-6">Bangalore</h3>
                <div className="grid md:grid-cols-2 gap-8 text-sm">
                  <div>
                    <p className="text-label text-xs mb-3">FLIGHT</p>
                    <p className="font-light leading-relaxed mb-2">
                      IndiGo 6E6547 · Direct · 1.5 hours
                    </p>
                    <p className="text-caption mb-4">Daily at 14:30</p>
                    <a
                      href="https://www.goindigo.in/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-elegant text-primary-600 text-xs uppercase tracking-wider"
                    >
                      Book Flight
                    </a>
                  </div>
                  <div>
                    <p className="text-label text-xs mb-3">TRAIN</p>
                    <p className="font-light leading-relaxed mb-2">
                      Via Manmad Junction
                    </p>
                    <p className="text-caption mb-4">24-26 hours · 7 trains available</p>
                    <a
                      href="https://www.irctc.co.in/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-elegant text-primary-600 text-xs uppercase tracking-wider"
                    >
                      Book Train
                    </a>
                  </div>
                </div>
              </motion.div>

              {/* Mumbai */}
              <motion.div
                className="group"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h3 className="text-2xl font-serif font-light mb-6">Mumbai</h3>
                <div className="grid md:grid-cols-2 gap-8 text-sm">
                  <div>
                    <p className="text-label text-xs mb-3">ROAD</p>
                    <p className="font-light leading-relaxed mb-2">
                      NH160 Highway · 180 km
                    </p>
                    <p className="text-caption mb-4">3-4 hours drive</p>
                    <a
                      href="https://www.uber.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-elegant text-primary-600 text-xs uppercase tracking-wider"
                    >
                      Book Cab
                    </a>
                  </div>
                  <div>
                    <p className="text-label text-xs mb-3">TRAIN</p>
                    <p className="font-light leading-relaxed mb-2">
                      Multiple daily trains
                    </p>
                    <p className="text-caption mb-4">3-4 hours · Most frequent</p>
                    <a
                      href="https://www.irctc.co.in/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-elegant text-primary-600 text-xs uppercase tracking-wider"
                    >
                      Book Train
                    </a>
                  </div>
                </div>
              </motion.div>

              {/* Kanpur */}
              <motion.div
                className="group"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h3 className="text-2xl font-serif font-light mb-6">Kanpur</h3>
                <div className="grid md:grid-cols-2 gap-8 text-sm">
                  <div>
                    <p className="text-label text-xs mb-3">FLIGHT</p>
                    <p className="font-light leading-relaxed mb-2">
                      Via Delhi · 4-5 hours total
                    </p>
                    <p className="text-caption mb-4">IndiGo connections</p>
                    <a
                      href="https://www.goindigo.in/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-elegant text-primary-600 text-xs uppercase tracking-wider"
                    >
                      Book Flight
                    </a>
                  </div>
                  <div>
                    <p className="text-label text-xs mb-3">TRAIN</p>
                    <p className="font-light leading-relaxed mb-2">
                      Direct & via Delhi
                    </p>
                    <p className="text-caption mb-4">Multiple options available</p>
                    <a
                      href="https://www.irctc.co.in/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-elegant text-primary-600 text-xs uppercase tracking-wider"
                    >
                      Book Train
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Booking Notes - Minimal */}
      <section className="py-20 md:py-32 border-t border-primary-100">
        <div className="max-w-screen-sm mx-auto px-6 lg:px-12 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            className="space-y-8"
          >
            <div>
              <p className="text-label text-xs mb-3">FLIGHT BOOKINGS</p>
              <p className="text-sm font-light leading-relaxed text-primary-600">
                Schedules for April 2026 available now. Book early for best rates!
              </p>
            </div>

            <div>
              <p className="text-label text-xs mb-3">TRAIN BOOKINGS</p>
              <p className="text-sm font-light leading-relaxed text-primary-600">
                IRCTC bookings open 120 days in advance
              </p>
            </div>

            <div>
              <p className="text-label text-xs mb-3">LOCAL TRANSPORT</p>
              <p className="text-sm font-light leading-relaxed text-primary-600">
                Taxis readily available. Uber and Ola operate in Nashik.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default TravelPage;