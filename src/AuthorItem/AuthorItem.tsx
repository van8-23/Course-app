

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

export default AuthorItem;

