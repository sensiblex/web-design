import React from 'react';

const Input = ({ 
  label, 
  type = 'text', 
  value, 
  onChange, 
  placeholder, 
  required = false, 
  error = null,
  readOnly = false,
  ...props 
}) => {
  return (
    <div>
      {label && (
        <label className="block text-grey-5 text-sm mb-2">
          {label}
        </label>
      )}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        readOnly={readOnly}
        className={`w-full h-[55px] bg-white/10 border rounded-32 px-6 text-white placeholder:text-grey-5 transition-colors ${
          error 
            ? 'border-red' 
            : 'border-white/20 focus:border-accent'
        } ${readOnly ? 'cursor-not-allowed' : ''}`}
        {...props}
      />
      {error && (
        <p className="text-red text-sm mt-1">{error}</p>
      )}
    </div>
  );
};

export default Input;
