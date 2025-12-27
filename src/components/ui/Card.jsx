import React from 'react';
import { motion } from 'framer-motion';

const Card = ({
  children,
  className = '',
  hover = true,
  padding = true,
  shadow = 'md',
  rounded = 'xl',
  gradient = false,
  onClick,
  delay = 0,
  ...props
}) => {
  const shadowClasses = {
    none: '',
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
    xl: 'shadow-xl',
    '2xl': 'shadow-2xl'
  };

  const roundedClasses = {
    none: '',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    '2xl': 'rounded-2xl',
    '3xl': 'rounded-3xl',
    full: 'rounded-full'
  };

  const cardClasses = `
    ${gradient ? 'bg-gradient-to-br from-white to-neutral-50' : 'bg-white'}
    ${shadowClasses[shadow]}
    ${roundedClasses[rounded]}
    ${padding ? 'p-6' : ''}
    ${hover ? 'hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 cursor-pointer' : ''}
    ${className}
  `;

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        delay: delay,
        ease: 'easeOut'
      }
    }
  };

  return (
    <motion.div
      className={cardClasses}
      onClick={onClick}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover={hover ? {
        scale: 1.02,
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
      } : {}}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default Card;