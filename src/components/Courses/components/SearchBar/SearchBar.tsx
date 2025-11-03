/*

type SearchBarProps = {
  value: string;
  onChange: (val: string) => void;
  onSearch: () => void;
  onClear?: () => void;
};

const SearchBar = ({ value, onChange, onSearch, onClear }: SearchBarProps) => (
  <div className="searchbar">
    <input
      placeholder="Search by title or id"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
    <button className="btn btn--primary" onClick={onSearch}>SEARCH</button>
    {onClear && <button className="btn" onClick={onClear}>×</button>}
  </div>
);
export default SearchBar;*/

import React from 'react';
import Button from '../../../../common/Button/Button';

type Props = {
  value: string;
  onChange: (v: string) => void;
  onSearch: () => void;
  onClear: () => void;
  placeholder?: string;
  className?: string;
};

const SearchBar: React.FC<Props> = ({
  value,
  onChange,
  onSearch,
  onClear,
  placeholder = 'Input text',
  className = '',
}) => {
  return (
    <div className={`searchbar ${className}`.trim()}>
      <input
        className="searchbar__input"
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Search courses"
      />
      <Button buttonText="SEARCH" onClick={onSearch} />
      {!!value && (
        <Button buttonText="CLEAR" onClick={onClear} className="ml-8" />
      )}
    </div>
  );
};

export default SearchBar;
