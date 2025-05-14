import css from './SearchBox.module.css';
import { useId } from 'react';
function SearchBox({ value, onSearch }) {
  const searchId = useId();
  return (
    <div className={css.searchWrapper}>
      <label htmlFor={`${searchId}-search`}>Find contacts by name</label>
      <input
        type="text"
        name="search"
        id={`${searchId}-search`}
        value={value}
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  );
}
export default SearchBox;
