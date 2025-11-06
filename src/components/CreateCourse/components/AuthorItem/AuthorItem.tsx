/*
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

export default AuthorItem;*/



import React from 'react';
import Button from '../../../../common/Button/Button';

export type AuthorItemProps = {
  name: string;
  variant: 'add' | 'remove';
  onAdd?: () => void;
  onRemove?: () => void;
};

const AuthorItem: React.FC<AuthorItemProps> = ({ name, variant, onAdd, onRemove }) => {
  const isAdd = variant === 'add';
  return (
    <div className="cc-row">
      <span className="cc-author-name">{name}</span>
      {isAdd ? (
        <Button buttonText="Add author" onClick={onAdd} type="button" />
      ) : (
        <Button buttonText="Delete author" onClick={onRemove} type="button" />
      )}
    </div>
  );
};

export default AuthorItem;