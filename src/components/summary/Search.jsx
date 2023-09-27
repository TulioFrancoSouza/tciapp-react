import React from 'react';
import { useContext } from 'react';
import { SearchContext } from '../../context/SearchContext';

const Search = () => {
  const { setQuery } = useContext(SearchContext);

  const handleSetQuery = (event) => {
    setQuery('');
    setQuery(event.target.value);
  };

  return (
    <div className="">
      <input
        onChange={handleSetQuery}
        className="min-w-[300px] w-[100%] mb-0 mt-5 focus:bg-white focus:text-black focus:placeholder:text-white bg-gray-200 md:mt-0 mb-0 min-w-[400px] min-h-[40px] px-5 py-1 rounded-lg border-r-2"
        type="text"
        name="search"
        placeholder="Ticket number or keyword"
      />
    </div>
  );
};

export default Search;
