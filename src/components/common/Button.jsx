import React from 'react';

const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseStyles = 'px-8 py-4 rounded-32 font-medium transition-all duration-300';
  
  const variants = {
    primary: 'bg-accent text-white hover:bg-accent/90',
    secondary: 'bg-white text-primary hover:bg-white/90',
    green: 'bg-green-dark text-white hover:bg-green-dark/90',
    red: 'bg-red-dark text-white hover:bg-red-dark/90',
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
