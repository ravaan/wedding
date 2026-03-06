import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import content from "../data/content.json";
import Divider from "../components/ui/Divider";
import { trackPageView } from "../services/analytics";

const EventsPage = () => {
  useEffect(() => {
    trackPageView("Events");
  }, []);

  return (
    <div className="min-h-screen bg-batik-cream">
      {/* Timeline */}
      <section className="pt-28 pb-20 md:pb-32">
        <div className="max-w-screen-md mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          >
            {/* Day 1 */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              className="text-center mb-12"
            >
              <Divider motif="floral" className="mb-8" />
              <h2 className="font-script text-4xl md:text-5xl lg:text-6xl tracking-tight mb-4 text-primary-500">
                Day One
              </h2>
              <p className="text-label text-xs">APRIL 24, 2026</p>
            </motion.div>

            <div className="space-y-8 mb-32 md:mb-48">
              {content.events.day1.events.map((event, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="relative border-l-4 border-orange pl-8 bg-white p-6 border-t border-r border-b border-t-orange/20 border-r-orange/20 border-b-orange/20"
                >
                  <div className="grid md:grid-cols-3 gap-6 md:gap-8">
                    <div className="md:text-right">
                      <p className="font-display text-2xl md:text-3xl font-semibold text-orange">
                        {event.time}
                      </p>
                    </div>

                    <div className="md:col-span-2">
                      <h3 className="text-xl md:text-2xl font-display font-semibold mb-4 text-primary-500">
                        {event.name}
                      </h3>
                      <p className="text-sm md:text-base text-primary-400 leading-relaxed mb-6">
                        {event.description}
                      </p>

                      <div className="space-y-2">
                        <p className="flex items-center gap-2 text-sm">
                          <MapPin
                            size={14}
                            strokeWidth={2}
                            className="text-orange"
                          />
                          <span className="text-xs font-semibold text-primary-500">
                            {event.venue}
                          </span>
                        </p>
                        {event.dress_code && (
                          <p className="text-xs font-semibold text-primary-400">
                            Attire: {event.dress_code}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Day 2 */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              className="text-center mb-12"
            >
              <Divider motif="floral" className="mb-8" />
              <h2 className="font-script text-4xl md:text-5xl lg:text-6xl tracking-tight mb-4 text-primary-500">
                Day Two
              </h2>
              <p className="text-label text-xs">APRIL 25, 2026</p>
            </motion.div>

            <div className="space-y-8">
              {content.events.day2.events.map((event, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="relative border-l-4 border-orange pl-8 bg-white p-6 border-t border-r border-b border-t-orange/20 border-r-orange/20 border-b-orange/20"
                >
                  <div className="grid md:grid-cols-3 gap-6 md:gap-8">
                    <div className="md:text-right">
                      <p className="font-display text-2xl md:text-3xl font-semibold text-orange">
                        {event.time}
                      </p>
                    </div>

                    <div className="md:col-span-2">
                      <h3 className="text-xl md:text-2xl font-display font-semibold mb-4 text-primary-500">
                        {event.name}
                      </h3>
                      <p className="text-sm md:text-base text-primary-400 leading-relaxed mb-6">
                        {event.description}
                      </p>

                      <div className="space-y-2">
                        <p className="flex items-center gap-2 text-sm">
                          <MapPin
                            size={14}
                            strokeWidth={2}
                            className="text-orange"
                          />
                          <span className="text-xs font-semibold text-primary-500">
                            {event.venue}
                          </span>
                        </p>
                        {event.dress_code && (
                          <p className="text-xs font-semibold text-primary-400">
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

      {/* Venue Information */}
      <section className="py-20 md:py-32 border-t-4 border-[var(--theme-gold)] bg-[var(--theme-green)]">
        <div className="max-w-screen-sm mx-auto px-6 lg:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          >
            <h2 className="font-script text-3xl md:text-4xl tracking-tight mb-8 md:mb-12 text-[var(--theme-gold-light)]">
              Venue
            </h2>

            <div className="space-y-4">
              <p className="text-lg md:text-xl font-semibold text-white">
                {content.venue.name}
              </p>
              <p className="text-sm text-white/80">{content.venue.address}</p>
              <p className="text-sm text-white/80 mt-6">
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
