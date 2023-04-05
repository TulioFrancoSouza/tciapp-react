import React from 'react'
import { useContext } from "react";
import { SearchContext } from "../../context/SearchContext";

const Filter = () => {

  const { setQuery } = useContext(SearchContext);

  const handleSetQueryPending = () => {setQuery('Pending')}
  const handleSetQueryAccepted = () => {setQuery('Accepted')}
  const handleSetQueryReview = () => {setQuery('Review')}
  const handleSetQueryClosed = () => {setQuery('Closed')}

  return (
    <div className="flex items-center em:justify-center">
        <button
          onClick={handleSetQueryPending}
          className="em:m-1 em:px-2 em:py-2 mr-3 border-solid border-2 border-gray-300 hover:border-blue-400 hover:bg-blue-400 hover:text-white rounded-lg px-5 py-2 text-sm text-gray-400"
          type="button"
        >
          Pending
        </button>
        <button
        onClick={handleSetQueryAccepted}
          className="em:m-1 em:px-2 em:py-2 mr-3 border-solid border-2 border-gray-300 hover:border-blue-400 hover:bg-blue-400 hover:text-white rounded-lg px-5 py-2 text-sm text-gray-400"
          type="button"
        >
          Accepeted
        </button>
        <button
          onClick={handleSetQueryReview}
          className="em:m-1 em:px-2 em:py-2 mr-3 border-solid border-2 border-gray-300 hover:border-blue-400 hover:bg-blue-400 hover:text-white rounded-lg px-5 py-2 text-sm text-gray-400"
          type="button"
        >
          Review
        </button>
        <button
          onClick={handleSetQueryClosed}
          className="em:m-1 em:px-2 em:py-2 mr-3 border-solid border-2 border-gray-300 hover:border-blue-400 hover:bg-blue-400 hover:text-white rounded-lg px-5 py-2 text-sm text-gray-400"
          type="button"
        >
          Closed
        </button>
    </div>
  )
}

export default Filter