import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Calendar, MapPin, Heart } from 'lucide-react';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import content from '../../data/content.json';
import Button from '../ui/Button';
import { trackCountdownView, trackClick } from '../../services/analytics';

dayjs.extend(duration);

const Hero = () => {
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const weddingDate = dayjs('2026-04-25 10:00:00');

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
      } else {
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    // Track countdown view
    trackCountdownView(Math.floor(dayjs.duration(weddingDate.diff(dayjs())).asDays()));

    return () => clearInterval(interval);
  }, []);

  const scrollToNext = () => {
    trackClick('Scroll Indicator', { from: 'hero' });
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.43, 0.13, 0.23, 0.96]
      }
    }
  };

  const CountdownUnit = ({ value, label }) => (
    <motion.div
      className="text-center"
      whileHover={{ scale: 1.05 }}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 200, damping: 15 }}
    >
      <motion.div
        key={value}
        initial={{ rotateX: -90, opacity: 0 }}
        animate={{ rotateX: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative"
      >
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-4 md:p-6 min-w-[80px] md:min-w-[100px]">
          <div className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-accent-500">
            {String(value).padStart(2, '0')}
          </div>
        </div>
      </motion.div>
      <p className="text-sm md:text-base text-white/90 mt-2 font-medium uppercase tracking-wider">
        {label}
      </p>
    </motion.div>
  );

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-200 via-secondary-200 to-accent-200">
        <motion.div
          className="absolute inset-0 opacity-30"
          animate={{
            backgroundImage: [
              'radial-gradient(circle at 20% 50%, rgba(255, 216, 232, 0.4) 0%, transparent 50%)',
              'radial-gradient(circle at 80% 50%, rgba(244, 228, 193, 0.4) 0%, transparent 50%)',
              'radial-gradient(circle at 50% 80%, rgba(232, 165, 152, 0.4) 0%, transparent 50%)',
              'radial-gradient(circle at 20% 50%, rgba(255, 216, 232, 0.4) 0%, transparent 50%)',
            ]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'linear'
          }}
        />
      </div>

      {/* Floating hearts animation */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-white/10"
            initial={{
              x: Math.random() * window.innerWidth,
              y: window.innerHeight + 100,
            }}
            animate={{
              y: -100,
              x: Math.random() * window.innerWidth,
            }}
            transition={{
              duration: Math.random() * 20 + 20,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: 'linear'
            }}
          >
            <Heart size={Math.random() * 40 + 20} fill="currentColor" />
          </motion.div>
        ))}
      </div>

      {/* Main content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 text-center px-4 py-20"
      >
        {/* Decorative element */}
        <motion.div
          variants={itemVariants}
          className="flex justify-center mb-6"
        >
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Heart className="w-16 h-16 text-white/80 fill-white/40" />
          </motion.div>
        </motion.div>

        {/* Names */}
        <motion.div variants={itemVariants}>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl text-white mb-4">
            <motion.span
              className="inline-block"
              whileHover={{ scale: 1.05 }}
            >
              {content.wedding.brideName.split(' ')[0]}
            </motion.span>
            <motion.span
              className="inline-block mx-4 text-3xl md:text-5xl"
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              &
            </motion.span>
            <motion.span
              className="inline-block"
              whileHover={{ scale: 1.05 }}
            >
              {content.wedding.groomName.split(' ')[0]}
            </motion.span>
          </h1>
        </motion.div>

        {/* Tagline */}
        <motion.div variants={itemVariants}>
          <p className="text-xl md:text-2xl text-white/90 font-serif italic mb-8">
            {content.wedding.tagline}
          </p>
        </motion.div>

        {/* Date and Location */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 mb-12"
        >
          <div className="flex items-center gap-2 text-white/90">
            <Calendar size={20} />
            <span className="text-lg md:text-xl font-medium">April 24-25, 2026</span>
          </div>
          <div className="hidden md:block text-white/60">•</div>
          <div className="flex items-center gap-2 text-white/90">
            <MapPin size={20} />
            <span className="text-lg md:text-xl font-medium">{content.wedding.location}</span>
          </div>
        </motion.div>

        {/* Countdown */}
        <motion.div variants={itemVariants} className="mb-12">
          <p className="text-white/80 text-sm md:text-base uppercase tracking-widest mb-6">
            Counting down to our special day
          </p>
          <div className="flex justify-center gap-4 md:gap-6">
            <CountdownUnit value={countdown.days} label="Days" />
            <CountdownUnit value={countdown.hours} label="Hours" />
            <CountdownUnit value={countdown.minutes} label="Minutes" />
            <CountdownUnit value={countdown.seconds} label="Seconds" />
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button
            variant="primary"
            size="large"
            onClick={() => trackClick('Hero RSVP Button')}
            className="bg-white text-primary-600 hover:bg-white/90"
            trackingLabel="Hero RSVP"
          >
            RSVP Now
          </Button>
          <Button
            variant="outline"
            size="large"
            onClick={() => trackClick('Hero View Events Button')}
            className="border-white text-white hover:bg-white/10"
            trackingLabel="Hero View Events"
          >
            View Events
          </Button>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.button
        onClick={scrollToNext}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/80 hover:text-white transition-colors"
        animate={{
          y: [0, 10, 0],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-sm uppercase tracking-wider">{content.hero.scrollText}</span>
          <ChevronDown size={24} />
        </div>
      </motion.button>
    </section>
  );
};

export default Hero;