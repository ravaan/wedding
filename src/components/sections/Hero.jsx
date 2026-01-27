import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import content from '../../data/content.json';
import { trackCountdownView, trackClick } from '../../services/analytics';

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
    const weddingDate = dayjs('2026-04-24 10:00:00');

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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white px-6 lg:px-12">
      {/* Sophisticated background texture */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />
      </div>

      <div className="relative z-10 w-full max-w-screen-xl mx-auto">
        {/* Elevated date typography */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
          className="text-center mb-8 md:mb-16"
        >
          <span className="text-label tracking-[0.3em]">
            APRIL 23—24, 2026
          </span>
        </motion.div>

        {/* Award-winning name display */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
          className="text-center mb-12 md:mb-20"
        >
          <div className="overflow-hidden">
            <motion.h1
              className="type-display balance"
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              transition={{ duration: 1.2, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
            >
              <span className="block lg:inline">{content.wedding.brideName.split(' ')[0]}</span>
            </motion.h1>
          </div>

          <motion.div
            className="my-6 md:my-8 lg:my-12"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 1, delay: 0.8, ease: [0.23, 1, 0.32, 1] }}
          >
            <span className="font-display text-3xl md:text-4xl lg:text-5xl font-light"
                  style={{ fontVariationSettings: '"opsz" 9, "wght" 200' }}>
              &
            </span>
          </motion.div>

          <div className="overflow-hidden">
            <motion.h1
              className="type-display balance"
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              transition={{ duration: 1.2, delay: 0.5, ease: [0.23, 1, 0.32, 1] }}
            >
              <span className="block lg:inline">{content.wedding.groomName.split(' ')[0]}</span>
            </motion.h1>
          </div>
        </motion.div>

        {/* Refined location */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1, ease: [0.23, 1, 0.32, 1] }}
          className="text-center mb-12 md:mb-20"
        >
          <p className="lead">
            <em>Nashik, Maharashtra</em>
          </p>
        </motion.div>

        {/* Sophisticated countdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2, ease: [0.23, 1, 0.32, 1] }}
          className="flex justify-center gap-8 md:gap-12 lg:gap-20 mb-12 md:mb-20"
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
                <span className="font-display text-4xl md:text-5xl lg:text-7xl font-light tracking-tight"
                      style={{ fontVariationSettings: '"opsz" 72, "wght" 350' }}>
                  {String(item.value).padStart(2, '0')}
                </span>
              </motion.div>
              <p className="text-label mt-2 md:mt-3 text-[10px] md:text-xs">
                {item.label}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Award-winning CTA buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5, ease: [0.23, 1, 0.32, 1] }}
          className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center items-center"
        >
          <button
            onClick={() => {
              trackClick('Hero RSVP Button');
              navigate('/rsvp');
            }}
            className="btn-primary group w-full sm:w-auto"
          >
            <span className="relative z-10">Confirm Attendance</span>
          </button>

          <button
            onClick={() => {
              trackClick('Hero View Details Button');
              navigate('/events');
            }}
            className="btn-secondary w-full sm:w-auto"
          >
            View Schedule
          </button>
        </motion.div>
      </div>

      {/* Minimal scroll indicator */}
      <motion.div
        className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ duration: 1, delay: 2 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 cursor-pointer"
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
        >
          <span className="text-label text-[10px] md:text-xs">Scroll</span>
          <svg width="1" height="40" viewBox="0 0 1 40" fill="none">
            <line x1="0.5" y1="0" x2="0.5" y2="40" stroke="currentColor" strokeDasharray="2 2" opacity="0.3"/>
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;