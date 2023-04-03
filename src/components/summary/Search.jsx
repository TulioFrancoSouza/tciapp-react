import React, { useState } from 'react'

const Search = () => {

  const [search, setSeach] = useState();
  console.log(search)

  return (
    <div className="em:justify-center em:mt-3 flex items-center">
        <input
          onChange={(event) =>{setSeach(event.target.value)}}
          className="focus:bg-white focus:text-black focus:placeholder:text-white bg-gray-200 em:min-w-[300px] em:mt-4 em:mb-5 min-w-[400px] min-h-[40px] px-5 py-1 rounded-lg border-r-2"
          type="text"
          name="search"
          placeholder="Ticket number or keyword"
        />
    </div>
  )
}

export default Search