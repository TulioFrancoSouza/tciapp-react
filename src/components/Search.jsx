import React, { useState } from 'react'
import { FcSearch } from "react-icons/fc";


const Search = () => {

  const [search, setSeach] = useState();
  console.log(search)

  return (
    <div className="flex items-center">
        <input
          onChange={(event) =>{setSeach(event.target.value)}}
          className="focus:bg-white focus:text-black focus:placeholder:text-white bg-gray-200 min-w-[400px] min-h-[40px] px-5 py-1 rounded-lg border-r-2"
          type="text"
          name="search"
          placeholder="Ticket number or keyword"
        />
        <div className="ml-3 w-5 h-5">
          <FcSearch />
        </div>
    </div>
  )
}

export default Search