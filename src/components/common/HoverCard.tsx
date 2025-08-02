import React from 'react';
import { motion } from 'framer-motion';

interface HoverCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  onHoverStart?: () => void;
  onHoverEnd?: () => void;
}

const HoverCard: React.FC<HoverCardProps> = ({ 
  children, 
  className = '', 
  onClick, 
  onHoverStart, 
  onHoverEnd 
}) => {
  return (
    <motion.div
      className={`bg-white dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl border border-gray-200 dark:border-white/10 shadow-lg overflow-hidden ${className}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ 
        y: -5,
        boxShadow: '0 10px 25px -5px rgba(34, 211, 238, 0.1)'
      }}
      transition={{ type: 'spring', stiffness: 300 }}
      onClick={onClick}
      onHoverStart={onHoverStart}
      onHoverEnd={onHoverEnd}
    >
      {children}
    </motion.div>
  );
};

export default HoverCard;
