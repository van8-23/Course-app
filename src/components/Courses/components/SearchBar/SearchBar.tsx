

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
export default SearchBar;
