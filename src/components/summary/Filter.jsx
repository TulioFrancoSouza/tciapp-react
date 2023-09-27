import React from "react";
import { useContext, useState } from "react";
import { SearchContext } from "../../context/SearchContext";

const Filter = () => {
  const { setQuery } = useContext(SearchContext);

  const [statusPending, setStatusPending] = useState(false);
  const [statusAccepted, setStatusAccepted] = useState(false);
  const [statusReview, setStatusReview] = useState(false);
  const [statusClosed, setStatusClosed] = useState(false);

  function handleSetQueryPending() {
    if (statusPending === true) {
      setStatusPending(false);
      setQuery("");
    } else {
      setStatusAccepted(false);
      setStatusReview(false);
      setStatusClosed(false);
      setStatusPending(true);
      setQuery("Pending");
    }
  }

  function handleSetQueryAccepted() {
    if (statusAccepted === true) {
      setStatusAccepted(false);
      setQuery("");
    } else {
      setStatusAccepted(true);
      setStatusReview(false);
      setStatusClosed(false);
      setStatusPending(false);
      setQuery("Accepted");
    }
  }

  function handleSetQueryReview() {
    if (statusReview === true) {
      setStatusReview(false);
      setQuery("");
    } else {
      setStatusAccepted(false);
      setStatusReview(true);
      setStatusClosed(false);
      setStatusPending(false);
      setQuery("Review");
    }
  }

  function handleSetQueryClosed() {
    if (statusClosed === true) {
      setStatusClosed(false);
      setQuery("");
    } else {
      setStatusAccepted(false);
      setStatusReview(false);
      setStatusClosed(true);
      setStatusPending(false);
      setQuery("Closed");
    }
  }

  return (
    <div className="flex justify-between my-5 items-center md:my-0">
      <button
        onClick={handleSetQueryPending}
        className={
          !statusPending
            ? `h-10 em:m-1 em:px-2 em:py-2 mr-3 border-solid border-2 border-gray-300 hover:border-blue-400 hover:bg-blue-400 hover:text-white rounded-lg px-5 py-2 text-sm text-gray-400`
            : `em:m-1 em:px-2 em:py-2 mr-3 border-solid border-2 border-blue-400 bg-blue-400 text-white rounded-lg px-5 py-2 text-sm`
        }
        type="button"
      >
        Pending
      </button>
      <button
        onClick={handleSetQueryAccepted}
        className={
          !statusAccepted
            ? `h-10 em:m-1 em:px-2 em:py-2 mr-3 border-solid border-2 border-gray-300 hover:border-blue-400 hover:bg-blue-400 hover:text-white rounded-lg px-5 py-2 text-sm text-gray-400`
            : `em:m-1 em:px-2 em:py-2 mr-3 border-solid border-2 border-blue-400 bg-blue-400 text-white rounded-lg px-5 py-2 text-sm`
        }
        type="button"
      >
        Accepted
      </button>
      <button
        onClick={handleSetQueryReview}
        className={
          !statusReview
            ? `h-10 em:m-1 em:px-2 em:py-2 mr-3 border-solid border-2 border-gray-300 hover:border-blue-400 hover:bg-blue-400 hover:text-white rounded-lg px-5 py-2 text-sm text-gray-400`
            : `em:m-1 em:px-2 em:py-2 mr-3 border-solid border-2 border-blue-400 bg-blue-400 text-white rounded-lg px-5 py-2 text-sm`
        }
        type="button"
      >
        Review
      </button>
      <button
        onClick={handleSetQueryClosed}
        className={
          !statusClosed
            ? `h-10 em:m-1 em:px-2 em:py-2 mr-3 border-solid border-2 border-gray-300 hover:border-blue-400 hover:bg-blue-400 hover:text-white rounded-lg px-5 py-2 text-sm text-gray-400`
            : `em:m-1 em:px-2 em:py-2 mr-3 border-solid border-2 border-blue-400 bg-blue-400 text-white rounded-lg px-5 py-2 text-sm`
        }
        type="button"
      >
        Closed
      </button>
    </div>
  );
};

export default Filter;
