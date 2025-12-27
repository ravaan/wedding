import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

const Loading = ({ fullScreen = false, message = 'Loading...', size = 'medium' }) => {
  const sizes = {
    small: 'w-8 h-8',
    medium: 'w-12 h-12',
    large: 'w-16 h-16'
  };

  const textSizes = {
    small: 'text-sm',
    medium: 'text-base',
    large: 'text-lg'
  };

  const LoadingContent = () => (
    <div className="flex flex-col items-center justify-center gap-4">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        className={sizes[size]}
      >
        <Heart className="w-full h-full text-primary-400 fill-primary-200" />
      </motion.div>

      <motion.div
        className="flex gap-1"
        initial={{ opacity: 0.5 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
      >
        <span className={`text-neutral-600 font-serif ${textSizes[size]}`}>{message}</span>
        <motion.span
          className={`text-primary-400 ${textSizes[size]}`}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          ❤️
        </motion.span>
      </motion.div>
    </div>
  );

  if (fullScreen) {
    return (
      <motion.div
        className="fixed inset-0 bg-white/95 backdrop-blur-sm z-50 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <LoadingContent />
      </motion.div>
    );
  }

  return <LoadingContent />;
};

export default Loading;