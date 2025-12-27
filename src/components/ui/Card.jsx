import React from 'react';
import { motion } from 'framer-motion';

const Card = ({
  children,
  className = '',
  hover = false,
  padding = true,
  border = true,
  onClick,
  delay = 0,
  ...props
}) => {
  const cardClasses = `
    bg-white
    ${border ? 'border border-primary-100' : ''}
    ${padding ? 'p-8 lg:p-12' : ''}
    ${hover ? 'hover:border-primary-300 transition-all duration-300 cursor-pointer' : ''}
    ${className}
  `;

  const cardVariants = {
    hidden: {
      opacity: 0
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
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
        x: 4
      } : {}}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default Card;