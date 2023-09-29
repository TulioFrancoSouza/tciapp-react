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
        className="w-[300px] p-2 bg-gray-200 rounded-lg focus:text-black  focus:bg-white focus:placeholder:text-white mt-5 md:mt-0"
        type="text"
        name="search"
        placeholder="Ticket number or keyword"
      />
    </div>
  );
};

export default Search;
