


import React from 'react';

import './input.css';

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
};

const Input: React.FC<InputProps> = ({ label, id, ...rest }) => {
  const htmlId = id || `input-${Math.random().toString(36).slice(2, 8)}`;
  return (
    <div className="input">
      {label && <label htmlFor={htmlId} className="input__label">{label}</label>}
      <input id={htmlId} className="input__control" {...rest} />
    </div>
  );
};

export default Input;