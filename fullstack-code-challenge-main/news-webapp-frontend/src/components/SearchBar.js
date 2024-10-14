import React, { useState, useContext } from "react";
import { NewsContext } from "../contexts/NewsContext";
import "../styles/searchbar.css";

function SearchBar() {
  const [inputError, setInputError] = useState("");
  const [searchTextContent, setSearchTextContent] = useState("");
  const { setSearchText, heading } = useContext(NewsContext);

  const searchKeyword = () => {
    setSearchText(searchTextContent);
  };

  const searchOnEnterKeyDown = (event) => {
    if (event.key === "Enter") {
      searchKeyword();
    }
  };

  const handleChange = (e) => {
    setSearchTextContent(e.target.value);
    setInputError("");
  };

  return (
    <div className="search-bar">
      <div className="search-form">
        <p className="input-error">{inputError}</p>
        <input
          type="text"
          required
          className="search-input"
          placeholder="Search for articles"
          onChange={handleChange}
          onKeyDown={searchOnEnterKeyDown}
        />
        <button
          type="submit"
          className="search-button"
          onClick={searchKeyword}
          data-testid="search-button"
        >
          Search
        </button>
      </div>
      <div className="search-header">{heading}</div>
    </div>
  );
}

export default SearchBar;
