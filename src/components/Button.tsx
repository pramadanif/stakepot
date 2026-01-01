'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'urgent';
  className?: string;
  icon?: boolean;
  onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  className = '', 
  icon = false,
  onClick 
}) => {
  const baseStyles = "inline-flex items-center justify-center px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg";
  
  const variants = {
    primary: "bg-gradient-to-r from-gold to-orange text-white shadow-orange/30 hover:shadow-orange/50",
    secondary: "bg-white text-dark border-2 border-orange/10 hover:border-orange/30 hover:bg-orange/5",
    urgent: "bg-urgency text-white shadow-urgency/30 hover:shadow-urgency/50 animate-pulse-slow"
  };

  return (
    <button 
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}
      {icon && <ArrowRight className="ml-2 w-5 h-5" />}
    </button>
  );
};
