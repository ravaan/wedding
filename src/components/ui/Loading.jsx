import React from 'react';
import { motion } from 'framer-motion';

const Loading = ({ fullScreen = false, message = '', size = 'medium' }) => {
  const sizes = {
    small: 'w-1 h-1',
    medium: 'w-1.5 h-1.5',
    large: 'w-2 h-2'
  };

  const LoadingContent = () => (
    <div className="flex flex-col items-center justify-center gap-6">
      <div className="flex gap-2">
        {[0, 0.2, 0.4].map((delay, index) => (
          <motion.div
            key={index}
            className={`${sizes[size]} bg-primary-400 rounded-full`}
            animate={{
              y: [0, -10, 0],
              opacity: [0.3, 1, 0.3]
            }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              delay: delay,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {message && (
        <p className="text-[10px] font-light tracking-[0.3em] uppercase text-primary-400">
          {message}
        </p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <motion.div
        className="fixed inset-0 bg-white z-50 flex items-center justify-center"
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