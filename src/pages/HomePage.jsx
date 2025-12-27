import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Calendar, MapPin, Users, Gift, Heart, Camera } from 'lucide-react';
import Hero from '../components/sections/Hero';
import Card from '../components/ui/Card';
import content from '../data/content.json';
import { trackPageView, trackClick } from '../services/analytics';

const HomePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    trackPageView('Home');
  }, []);

  const navigationCards = [
    {
      title: 'Events Schedule',
      description: 'Two days of celebration and joy',
      icon: Calendar,
      path: '/events',
      color: 'from-primary-400 to-primary-600',
      delay: 0.1
    },
    {
      title: 'RSVP',
      description: 'Let us know you\'re coming',
      icon: Users,
      path: '/rsvp',
      color: 'from-accent-400 to-accent-600',
      highlight: true,
      delay: 0.2
    },
    {
      title: 'Travel & Stay',
      description: 'Plan your journey to Nashik',
      icon: MapPin,
      path: '/travel',
      color: 'from-secondary-400 to-secondary-600',
      delay: 0.3
    },
    {
      title: 'Traditions',
      description: 'Learn about our ceremonies',
      icon: Gift,
      path: '/ceremonies',
      color: 'from-primary-400 to-accent-400',
      delay: 0.4
    }
  ];

  const handleCardClick = (card) => {
    trackClick('Navigation Card', { title: card.title, path: card.path });
    navigate(card.path);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-0"
    >
      {/* Hero Section */}
      <Hero />

      {/* Navigation Cards Section */}
      <section className="section-padding -mt-20 relative z-20">
        <div className="container-custom mx-auto">
          {/* Welcome Message */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <Heart className="w-12 h-12 text-primary-400 fill-primary-200 mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-serif text-neutral-800 mb-4">
              {content.messages.welcome}
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Mark your calendar for April 24-25, 2026, and join us in Nashik for an unforgettable celebration
              filled with love, tradition, and joy.
            </p>
          </motion.div>

          {/* Navigation Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {navigationCards.map((card) => {
              const Icon = card.icon;
              return (
                <Card
                  key={card.path}
                  hover
                  delay={card.delay}
                  onClick={() => handleCardClick(card)}
                  className={`
                    relative overflow-hidden group cursor-pointer
                    ${card.highlight ? 'ring-2 ring-primary-400 ring-offset-2' : ''}
                  `}
                >
                  {card.highlight && (
                    <motion.div
                      className="absolute top-0 right-0 bg-gradient-to-br from-primary-400 to-accent-400 text-white text-xs px-3 py-1 rounded-bl-lg font-medium"
                      animate={{
                        scale: [1, 1.05, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      Important
                    </motion.div>
                  )}

                  <div className="relative z-10">
                    <div className={`
                      w-14 h-14 rounded-xl bg-gradient-to-br ${card.color}
                      flex items-center justify-center mb-4
                      group-hover:scale-110 transition-transform duration-300
                    `}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>

                    <h3 className="text-xl font-serif text-neutral-800 mb-2">
                      {card.title}
                    </h3>
                    <p className="text-neutral-600">
                      {card.description}
                    </p>

                    <div className="mt-4 text-primary-600 font-medium flex items-center gap-2">
                      <span>Explore</span>
                      <motion.span
                        animate={{ x: [0, 5, 0] }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      >
                        →
                      </motion.span>
                    </div>
                  </div>

                  {/* Hover gradient overlay */}
                  <div className={`
                    absolute inset-0 bg-gradient-to-br ${card.color} opacity-0
                    group-hover:opacity-5 transition-opacity duration-300
                  `} />
                </Card>
              );
            })}
          </div>

          {/* Additional Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {/* Venue Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="bg-gradient-to-br from-white to-primary-50 rounded-xl p-6 shadow-lg"
            >
              <MapPin className="w-8 h-8 text-primary-500 mb-3" />
              <h3 className="font-serif text-lg text-neutral-800 mb-2">Venue</h3>
              <p className="text-neutral-600 font-medium">{content.venue.name}</p>
              <p className="text-sm text-neutral-500">{content.venue.address}</p>
            </motion.div>

            {/* Date Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="bg-gradient-to-br from-white to-accent-50 rounded-xl p-6 shadow-lg"
            >
              <Calendar className="w-8 h-8 text-accent-500 mb-3" />
              <h3 className="font-serif text-lg text-neutral-800 mb-2">Save the Date</h3>
              <p className="text-neutral-600 font-medium">April 24-25, 2026</p>
              <p className="text-sm text-neutral-500">Two days of celebration</p>
            </motion.div>

            {/* Gallery Teaser */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="bg-gradient-to-br from-white to-secondary-50 rounded-xl p-6 shadow-lg cursor-pointer hover:shadow-xl transition-shadow"
              onClick={() => {
                trackClick('Gallery Teaser');
                navigate('/gallery');
              }}
            >
              <Camera className="w-8 h-8 text-secondary-500 mb-3" />
              <h3 className="font-serif text-lg text-neutral-800 mb-2">Gallery</h3>
              <p className="text-neutral-600 font-medium">Coming Soon</p>
              <p className="text-sm text-neutral-500">Beautiful moments await</p>
            </motion.div>
          </div>

          {/* Quote Section */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.8 }}
            className="mt-20 text-center"
          >
            <div className="max-w-3xl mx-auto">
              <motion.div
                animate={{
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="inline-block"
              >
                <Heart className="w-8 h-8 text-primary-400 fill-primary-400 mx-auto mb-4" />
              </motion.div>
              <p className="text-2xl md:text-3xl font-serif italic text-neutral-700">
                "Two souls, one heart, infinite love"
              </p>
              <p className="mt-4 text-neutral-600">
                We can't wait to celebrate this special moment with you
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default HomePage;