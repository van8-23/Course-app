
/*
import React from 'react';

export type Author = Readonly<{
  id: string;
  name: string;
}>;


export type Props = Readonly<{
  author: Author;
  onAdd?: (author: Author) => void;
  onRemove?: (id: string) => void;
  mode?: 'add' | 'remove'; 
}>;

const AuthorItem: React.FC<Props> = ({ author, onAdd, onRemove, mode = 'add' }) => {
  const handleClick = () => {
    if (mode === 'add' && onAdd) onAdd(author);
    if (mode === 'remove' && onRemove) onRemove(author.id);
  };

  return (
    <div data-testid={`author-item-${author.id}`}>
      <span>{author.name}</span>
      <button type="button" onClick={handleClick}>
        {mode === 'add' ? 'Add author' : 'Delete author'}
      </button>
    </div>
  );
};

export default AuthorItem;*/

import React from 'react';
import Button from '../common/Button/Button';
import type { Author } from '../constants';

type Mode = 'add' | 'remove';

type Props = {
  author: Author;
  mode?: Mode;
  onAdd?: (author: Author) => void;
  onRemove?: (author: Author) => void;
};

const getButtonLabel = (mode: Mode) => (mode === 'add' ? 'ADD AUTHOR' : 'DELETE AUTHOR');

const AuthorItem: React.FC<Props> = ({ author, mode = 'add', onAdd, onRemove }) => {
  const handleClick = () => {
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