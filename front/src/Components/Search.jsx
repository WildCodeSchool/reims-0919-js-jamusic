import React from "react";
import "./Search.css";

const Search = props => {
  return (
    <div className="search_sidebar">
      {props.researchIsVisible && (
        <img
          src="https://img.icons8.com/material-outlined/24/000000/chevron-left.png"
          alt="chevron"
          onClick={props.handleresearchIsVisible}
          className="menu_return_icon"
        ></img>
      )}
      <p>Selectionnez vos tags:</p>
      <ul>
        {props.tags.map(tag => {
          return (
            <li
              key={tag.id}
              onClick={() => props.handleSelectedTags(tag.instrument)}
              className={
                props.selectedTags.includes(tag.instrument)
                  ? "is_selected"
                  : "not_selected"
              }
            >{`#${tag.instrument}`}</li>
          );
        })}
      </ul>
    </div>
  );
};

export default Search;
