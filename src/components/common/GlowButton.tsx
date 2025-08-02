import React from 'react';
import { motion } from 'framer-motion';

interface GlowButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  glowColor?: string;
  disabled?: boolean;
}

const GlowButton: React.FC<GlowButtonProps> = ({ 
  children, 
  onClick, 
  className = '', 
  glowColor = 'rgba(34, 211, 238, 0.5)', 
  disabled = false 
}) => {
  return (
    <motion.button
      className={`relative overflow-hidden px-6 py-3 rounded-xl font-medium ${className}`}
      onClick={onClick}
      disabled={disabled}
      whileHover={{ 
        scale: 1.05,
        boxShadow: `0 0 15px ${glowColor}`
      }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 400, damping: 10 }}
    >
      {children}
      <motion.span 
        className="absolute inset-0 bg-gradient-to-r from-transparent to-white/10 opacity-0 hover:opacity-100"
        transition={{ duration: 0.3 }}
      />
    </motion.button>
  );
};

export default GlowButton;
