import React from 'react';
import Button from '../../common/Button/Button';

export type AuthorItemProps = {
  name: string;
  variant: 'add' | 'remove';
  onAdd?: () => void;
  onRemove?: () => void;
};

const AuthorItem: React.FC<AuthorItemProps> = ({ name, variant, onAdd, onRemove }) => {
  const isAdd = variant === 'add';

  const handleClick = () => {
    if (isAdd) {
      onAdd?.();
    } else {
      onRemove?.();
    }
  };

  return (
    <div className="cc-row">
      <span className="cc-author-name">{name}</span>
      <Button buttonText={isAdd ? 'Add author' : 'Delete author'} onClick={handleClick} type="button" />
    </div>
  );
};

export default AuthorItem;