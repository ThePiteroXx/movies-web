import { useState, useRef } from 'react';
import { useQuery } from 'react-query';
import { useMovie } from 'context/MovieContext';
import { searchMovie } from 'api/api';
import { debounce } from 'helper';

import { Movie, CategoryQuery } from 'types';

import { ReactComponent as SearchIcon } from 'assets/icons/search.svg';

const SearchBar: React.FC = () => {
  const { setMovie } = useMovie();
  const [searchValue, setSearchValue] = useState<string>('');
  const { data } = useQuery([CategoryQuery.SEARCH, searchValue], () => (searchValue.length > 0 ? searchMovie(searchValue) : null));
  const [showBar, setShowBar] = useState<boolean>(false);
  const bar = useRef<HTMLInputElement>(null);

  return (
    <div className='cursor-pointer flex items-center'>
      <div className={`relative mr-1 transition-transform delay-100 origin-right ${showBar ? 'scale-x-100' : 'scale-x-0'}`}>
        <input
          type='search'
          className='px-2 w-40 md:w-auto rounded-md border-2 border-transparent focus:outline-none focus:border-slate-500'
          onChange={debounce((e) => {
            setSearchValue(e.target.value);
          }, 500)}
          onBlur={() => setShowBar(false)}
          ref={bar}
        />
        <div className='absolute top-full left-0 max-h-64 max-w-full overflow-y-scroll bg-slate-200'>
          {data &&
            data.results.map((item: Movie) => (
              <div
                key={item.id}
                className='p-2 hover:bg-slate-300'
                role='searchbox'
                tabIndex={0}
                onClick={() => setMovie(item)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') setMovie(item);
                }}
                onFocus={() => setShowBar(true)}
                onBlur={() => setShowBar(false)}
              >
                {item.title}
              </div>
            ))}
        </div>
      </div>

      <SearchIcon
        className='fill-cyan-500'
        onClick={() => {
          setShowBar(true);
          bar.current?.focus();
        }}
      />
    </div>
  );
};

export default SearchBar;
