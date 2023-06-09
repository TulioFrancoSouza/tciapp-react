import React from 'react'

const Filter = () => {
  return (
    <div className="flex items-center">
        <button
          className="mr-3 border-solid border-2 border-gray-300 hover:border-blue-400 hover:bg-blue-400 hover:text-white rounded-lg px-5 py-2 text-sm text-gray-400"
          type="button"
        >
          Pending
        </button>
        <button
          className="mr-3 border-solid border-2 border-gray-300 hover:border-blue-400 hover:bg-blue-400 hover:text-white rounded-lg px-5 py-2 text-sm text-gray-400"
          type="button"
        >
          Accepeted
        </button>
        <button
          className="mr-3 border-solid border-2 border-gray-300 hover:border-blue-400 hover:bg-blue-400 hover:text-white rounded-lg px-5 py-2 text-sm text-gray-400"
          type="button"
        >
          Review
        </button>
        <button
          className="mr-3 border-solid border-2 border-gray-300 hover:border-blue-400 hover:bg-blue-400 hover:text-white rounded-lg px-5 py-2 text-sm text-gray-400"
          type="button"
        >
          Closed
        </button>
    </div>
  )
}

export default Filter