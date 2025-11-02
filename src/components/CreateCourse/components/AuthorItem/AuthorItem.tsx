import React from 'react';
import Button from '../../../../common/Button/Button';

type Props = {
  name: string;
  variant: 'add' | 'remove';
  onAdd?: () => void;
  onRemove?: () => void;
};

const AuthorItem: React.FC<Props> = ({ name, variant, onAdd, onRemove }) => {
  return (
    <div className="cc-row">
      <span className="cc-author-name">{name}</span>
      {variant === 'add' ? (
        <Button buttonText="ADD AUTHOR" onClick={onAdd} />
      ) : (
        <Button buttonText="DELETE AUTHOR" onClick={onRemove} />
      )}
    </div>
  );
};

export default AuthorItem;
