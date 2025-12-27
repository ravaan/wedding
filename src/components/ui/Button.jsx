import React from 'react';
import { motion } from 'framer-motion';
import { trackClick } from '../../services/analytics';

const Button = ({
  children,
  variant = 'primary',
  size = 'medium',
  onClick,
  disabled = false,
  loading = false,
  icon: Icon,
  iconPosition = 'left',
  fullWidth = false,
  className = '',
  trackingLabel,
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium transition-all duration-300 transform focus:outline-none focus:ring-4 focus:ring-opacity-50';

  const variants = {
    primary: 'bg-gradient-to-r from-primary-400 to-primary-500 text-white hover:from-primary-500 hover:to-primary-600 shadow-lg hover:shadow-xl focus:ring-primary-300',
    secondary: 'bg-gradient-to-r from-secondary-200 to-secondary-300 text-neutral-800 hover:from-secondary-300 hover:to-secondary-400 shadow-md hover:shadow-lg focus:ring-secondary-200',
    outline: 'border-2 border-primary-400 text-primary-600 hover:bg-primary-50 hover:border-primary-500 focus:ring-primary-200',
    ghost: 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-800 focus:ring-neutral-200',
    danger: 'bg-red-500 text-white hover:bg-red-600 shadow-md hover:shadow-lg focus:ring-red-300'
  };

  const sizes = {
    small: 'px-3 py-1.5 text-sm rounded-md gap-1.5',
    medium: 'px-5 py-2.5 text-base rounded-lg gap-2',
    large: 'px-7 py-3.5 text-lg rounded-xl gap-2.5'
  };

  const handleClick = (e) => {
    if (disabled || loading) return;

    // Track button click
    if (trackingLabel) {
      trackClick(trackingLabel, { variant, size });
    }

    if (onClick) onClick(e);
  };

  const buttonClasses = `
    ${baseClasses}
    ${variants[variant]}
    ${sizes[size]}
    ${fullWidth ? 'w-full' : ''}
    ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 active:scale-95'}
    ${className}
  `;

  return (
    <motion.button
      className={buttonClasses}
      onClick={handleClick}
      disabled={disabled || loading}
      whileHover={!disabled && !loading ? { y: -2 } : {}}
      whileTap={!disabled && !loading ? { scale: 0.98 } : {}}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      {...props}
    >
      {loading ? (
        <>
          <div className="spinner w-4 h-4" />
          <span>Loading...</span>
        </>
      ) : (
        <>
          {Icon && iconPosition === 'left' && <Icon size={size === 'small' ? 16 : size === 'large' ? 24 : 20} />}
          {children}
          {Icon && iconPosition === 'right' && <Icon size={size === 'small' ? 16 : size === 'large' ? 24 : 20} />}
        </>
      )}
    </motion.button>
  );
};

export default Button;