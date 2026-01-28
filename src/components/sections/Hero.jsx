import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import content from '../../data/content.json';
import { trackCountdownView, trackClick } from '../../services/analytics';
import FloralDecoration from '../ui/FloralDecoration';

dayjs.extend(duration);

const Hero = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const weddingDate = dayjs('2026-04-23 10:00:00');

    const updateCountdown = () => {
      const now = dayjs();
      const diff = weddingDate.diff(now);

      if (diff > 0) {
        const duration = dayjs.duration(diff);
        setCountdown({
          days: Math.floor(duration.asDays()),
          hours: duration.hours(),
          minutes: duration.minutes(),
          seconds: duration.seconds()
        });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    trackCountdownView(Math.floor(dayjs.duration(weddingDate.diff(dayjs())).asDays()));

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-cream px-6 lg:px-12 pt-24 md:pt-28">
      {/* Maximalist floral decorations - Large corner pieces */}
      <div className="absolute top-0 left-0 w-48 md:w-64 lg:w-80 xl:w-96 h-auto pointer-events-none">
        <motion.div
          initial={{ opacity: 0, x: -100, y: -100 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 1.5, delay: 0.3 }}
        >
          <FloralDecoration variant="corner-left" className="w-full h-auto" />
        </motion.div>
      </div>

      <div className="absolute top-0 right-0 w-48 md:w-64 lg:w-80 xl:w-96 h-auto pointer-events-none">
        <motion.div
          initial={{ opacity: 0, x: 100, y: -100 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 1.5, delay: 0.3 }}
        >
          <FloralDecoration variant="corner-right" className="w-full h-auto" />
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 w-48 md:w-64 lg:w-80 xl:w-96 h-auto pointer-events-none rotate-180 hidden md:block">
        <motion.div
          initial={{ opacity: 0, x: -100, y: 100 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 1.5, delay: 0.5 }}
        >
          <FloralDecoration variant="corner-left" className="w-full h-auto" />
        </motion.div>
      </div>

      <div className="absolute bottom-0 right-0 w-48 md:w-64 lg:w-80 xl:w-96 h-auto pointer-events-none rotate-180 hidden md:block">
        <motion.div
          initial={{ opacity: 0, x: 100, y: 100 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 1.5, delay: 0.5 }}
        >
          <FloralDecoration variant="corner-right" className="w-full h-auto" />
        </motion.div>
      </div>

      {/* Side borders for extra lushness */}
      <div className="absolute left-0 top-1/4 w-16 md:w-20 lg:w-24 h-1/2 pointer-events-none hidden lg:block">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.5, delay: 0.7 }}
        >
          <FloralDecoration variant="side-border" className="w-full h-full" />
        </motion.div>
      </div>

      <div className="absolute right-0 top-1/4 w-16 md:w-20 lg:w-24 h-1/2 pointer-events-none hidden lg:block rotate-180">
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.5, delay: 0.7 }}
        >
          <FloralDecoration variant="side-border" className="w-full h-full" />
        </motion.div>
      </div>

      {/* Decorative frame corners */}
      <div className="absolute top-4 left-4 w-24 md:w-32 lg:w-40 pointer-events-none">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <FloralDecoration variant="frame-corner" className="w-full h-auto" />
        </motion.div>
      </div>
      <div className="absolute top-4 right-4 w-24 md:w-32 lg:w-40 pointer-events-none -scale-x-100">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <FloralDecoration variant="frame-corner" className="w-full h-auto" />
        </motion.div>
      </div>
      <div className="absolute bottom-4 left-4 w-24 md:w-32 lg:w-40 pointer-events-none -scale-y-100 hidden md:block">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <FloralDecoration variant="frame-corner" className="w-full h-auto" />
        </motion.div>
      </div>
      <div className="absolute bottom-4 right-4 w-24 md:w-32 lg:w-40 pointer-events-none scale-[-1] hidden md:block">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <FloralDecoration variant="frame-corner" className="w-full h-auto" />
        </motion.div>
      </div>

      {/* Inner decorative border */}
      <div className="absolute inset-6 md:inset-10 lg:inset-14 border-2 border-gold/40 pointer-events-none rounded-sm" />
      <div className="absolute inset-8 md:inset-12 lg:inset-16 border border-white/20 pointer-events-none rounded-sm" />

      <div className="relative z-10 w-full max-w-screen-xl mx-auto">
        {/* Elevated date typography */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
          className="text-center mb-6 md:mb-12"
        >
          <span className="text-label tracking-[0.3em] text-gold">
            APRIL 23—24, 2026
          </span>
        </motion.div>

        {/* Royal maximalist name display */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
          className="text-center mb-8 md:mb-16"
        >
          <div className="overflow-hidden">
            <motion.h1
              className="type-display balance text-white"
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              transition={{ duration: 1.2, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
            >
              <span className="block lg:inline">{content.wedding.brideName.split(' ')[0]}</span>
            </motion.h1>
          </div>

          <motion.div
            className="my-4 md:my-6 lg:my-10"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 1, delay: 0.8, ease: [0.23, 1, 0.32, 1] }}
          >
            <span className="font-display text-3xl md:text-4xl lg:text-5xl font-light text-gold-light"
                  style={{ fontVariationSettings: '"opsz" 9, "wght" 200' }}>
              &
            </span>
          </motion.div>

          <div className="overflow-hidden">
            <motion.h1
              className="type-display balance text-white"
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              transition={{ duration: 1.2, delay: 0.5, ease: [0.23, 1, 0.32, 1] }}
            >
              <span className="block lg:inline">{content.wedding.groomName.split(' ')[0]}</span>
            </motion.h1>
          </div>
        </motion.div>

        {/* Elaborate floral divider */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="flex justify-center mb-6 md:mb-10"
        >
          <FloralDecoration variant="divider" className="w-64 md:w-80 lg:w-96 h-auto" />
        </motion.div>

        {/* Refined location */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1, ease: [0.23, 1, 0.32, 1] }}
          className="text-center mb-10 md:mb-16"
        >
          <p className="lead text-white/90">
            <em>Nashik, Maharashtra</em>
          </p>
        </motion.div>

        {/* Sophisticated countdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2, ease: [0.23, 1, 0.32, 1] }}
          className="flex justify-center gap-6 md:gap-10 lg:gap-16 mb-10 md:mb-16"
        >
          {[
            { value: countdown.days, label: 'Days' },
            { value: countdown.hours, label: 'Hours' },
            { value: countdown.minutes, label: 'Minutes' }
          ].map((item, index) => (
            <motion.div
              key={item.label}
              className="text-center"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <motion.div
                key={item.value}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="relative"
              >
                <span className="font-display text-3xl md:text-4xl lg:text-6xl font-light tracking-tight text-white"
                      style={{ fontVariationSettings: '"opsz" 72, "wght" 350' }}>
                  {String(item.value).padStart(2, '0')}
                </span>
              </motion.div>
              <p className="text-label mt-2 md:mt-3 text-[10px] md:text-xs text-gold-light">
                {item.label}
              </p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;
