import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { trackPageView } from '../services/analytics';

const RSVPPage = () => {
  useEffect(() => {
    trackPageView('RSVP');
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-24 section-padding min-h-screen"
    >
      <div className="container-custom mx-auto">
        <h1 className="text-4xl font-serif text-center mb-8">RSVP</h1>
        <p className="text-center text-neutral-600">RSVP form coming soon...</p>
      </div>
    </motion.div>
  );
};

export default RSVPPage;
