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
import type { Author } from '../../../../constants';

type Mode = 'add' | 'remove';

type Props = {
  author: Author;
  mode?: Mode;
  onAdd?: (author: Author) => void;
  onRemove?: (author: Author) => void;
};

const getButtonLabel = (mode: Mode) => (mode === 'add' ? 'ADD AUTHOR' : 'DELETE AUTHOR');

const AuthorItem: React.FC<Props> = ({ author, mode = 'add', onAdd, onRemove }) => {
  const handleClick = (_event: React.MouseEvent<HTMLButtonElement>) => {
    if (mode === 'add') {
      onAdd?.(author);
    } else {
      onRemove?.(author);
    }
  };

  return (
    <div className="cc-row" data-testid={`author-item-${author.id}`}>
      <span className="cc-author-name">{author.name}</span>
      <Button buttonText={getButtonLabel(mode)} onClick={handleClick} />
    </div>
  );
};

export default AuthorItem;
