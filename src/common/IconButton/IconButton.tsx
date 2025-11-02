

import React from 'react';
import './iconButton.css';

type IconButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  icon: string;
  label?: string;
  alt?: string;
};

const IconButton: React.FC<IconButtonProps> = ({ icon, alt, label, className, ...rest }) => {
  return (
    <button {...rest} className={['icon-btn', className].filter(Boolean).join(' ')}>
      <img src={icon} alt={alt} className="icon-btn__img" />
    </button>
  );
};
export default IconButton;

