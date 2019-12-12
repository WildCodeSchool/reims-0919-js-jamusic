import React from "react";
import "./Search.css"

const Search = (props) => {

  return (
    <div className="search_sidebar">
      <p>Selectionnez vos tags:</p>
      <ul>
      {props.tags.map(tag => {
        return(
          <li key={tag.id} onTouchStartCapture={() => props.handleSelectedTags(tag.id)}>{`#${tag.instrument}`}</li>
        )})}
      
      </ul>

    </div>
  )
}

export default Search;