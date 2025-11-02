import React from 'react';

import './button.css';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  buttonText: string;
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
};

const Button: React.FC<ButtonProps> = ({ buttonText, variant = 'primary', className, ...rest }) => {
  const base = 'btn';
  const v = `${base}--${variant}`;
  return (
    <button {...rest} className={[base, v, className].filter(Boolean).join(' ')}>
      {buttonText}
    </button>
  );
};

export default Button;
