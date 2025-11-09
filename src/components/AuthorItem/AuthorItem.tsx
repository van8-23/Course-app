/*

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
  isCourseAuthor,
  onButtonClick,
}) => {
  const label = isCourseAuthor ? 'Delete author' : 'Add author';

  const handleClick = () => {
    onButtonClick(id);
  };

  return (
    <div className="cc-row">
      <span className="cc-author-name">{name}</span>
      <Button
        buttonText={label}
        type="button"
        onClick={handleClick}
      />
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
  const label = isCourseAuthor ? 'Delete author' : 'Add author';

  return (
    <div className="cc-row">
      <span className="cc-author-name">{name}</span>
      <Button
        buttonText={label}
        type="button"
        onClick={() => onButtonClick(id)}
      />
    </div>
  );
};

export default AuthorItem;
