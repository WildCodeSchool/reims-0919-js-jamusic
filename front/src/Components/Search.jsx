import React from "react";
import "./Search.css"

const Search = ({tags}) => {
  return (
    <div className="search_sidebar">
      <p>Selectionnez vos tags:</p>
      {tags}

    </div>
  )
}

export default Search;