import React from "react";
import { motion } from "framer-motion";
import { trackClick } from "../../services/analytics";

const Button = ({
  children,
  variant = "primary",
  size = "medium",
  onClick,
  disabled = false,
  loading = false,
  icon: Icon,
  iconPosition = "left",
  fullWidth = false,
  className = "",
  trackingLabel,
  ...props
}) => {
  const baseClasses =
    "inline-flex items-center justify-center font-sans font-bold transition-all duration-300 cursor-pointer";

  const variants = {
    primary:
      "bg-[var(--theme-green)] text-cream hover:bg-orange hover:text-white border-3 border-orange",
    secondary:
      "border-3 border-orange text-primary-500 hover:bg-[var(--theme-green)] hover:text-cream",
    ghost: "text-primary-500 hover:text-orange font-semibold",
    minimal: "text-primary-400 hover:text-primary-600",
  };

  const sizes = {
    small: "px-6 py-2 text-[10px] tracking-[0.2em] uppercase",
    medium: "px-8 py-3 text-[11px] tracking-[0.25em] uppercase",
    large: "px-10 py-4 text-xs tracking-[0.3em] uppercase",
  };

  const handleClick = (e) => {
    if (disabled || loading) return;

    if (trackingLabel) {
      trackClick(trackingLabel, { variant, size });
    }

    if (onClick) onClick(e);
  };

  const buttonClasses = `
    ${baseClasses}
    ${variants[variant]}
    ${sizes[size]}
    ${fullWidth ? "w-full" : ""}
    ${disabled ? "opacity-30 cursor-not-allowed" : ""}
    ${className}
  `;

  return (
    <motion.button
      className={buttonClasses}
      onClick={handleClick}
      disabled={disabled || loading}
      whileHover={!disabled && !loading ? { scale: 1.02 } : {}}
      whileTap={!disabled && !loading ? { scale: 0.98 } : {}}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      {...props}
    >
      {loading ? (
        <span>Loading...</span>
      ) : (
        <>
          {Icon && iconPosition === "left" && (
            <Icon size={14} strokeWidth={1.5} />
          )}
          {children}
          {Icon && iconPosition === "right" && (
            <Icon size={14} strokeWidth={1.5} />
          )}
        </>
      )}
    </motion.button>
  );
};

export default Button;
