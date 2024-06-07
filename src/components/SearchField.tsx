import { ChangeEvent, useState } from 'react';
import SearchIcon from '../assets/icons/Search.icon';
import { useAppDispatch } from '../store';
import { setSearchQuery } from '../store/postsSlice';

const SearchField = () => {
  const dispatch = useAppDispatch();
  const [query, setQuery] = useState('');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    dispatch(setSearchQuery(value));
  };

  return (
    <div className="form-control hidden md:flex">
      <div className="join bg-base-100 items-center border border-neutral">
        <input
          placeholder="Search…"
          type="text"
          className="input input-sm h-[30px] join-item border-0 focus:outline-none"
          value={query}
          onChange={handleInputChange}
        />
        <span className="join-item px-1">
          <SearchIcon />
        </span>
      </div>
    </div>
  );
};

export default SearchField;
