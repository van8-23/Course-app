/*import React from 'react';
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

export default AuthorItem;*/


import React from 'react';
import Button from '../../common/Button/Button';

export type AuthorItemProps = {
  id: string;
  name: string;
  isCourseAuthor?: boolean;
  onButtonClick: (id: string) => void;
};

const AuthorItem: React.FC<AuthorItemProps> = ({
  id,
  name,
  isCourseAuthor = false,
  onButtonClick,
}) => {
  const buttonText = isCourseAuthor ? 'Delete author' : 'Add author';

  return (
    <div className="cc-row">
      <span className="cc-author-name">{name}</span>
      <Button
        buttonText={buttonText}
        type="button"
        onClick={() => onButtonClick(id)}
      />
    </div>
  );
};

export default AuthorItem;
