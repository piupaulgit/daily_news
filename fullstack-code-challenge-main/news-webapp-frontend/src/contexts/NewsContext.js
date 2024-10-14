import React, { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import newsapi from "../services/newsapi";
import {
  TOP_HEADLINES_SUBDIRECTORY,
  DEFAULT_US_TOP_HEADLINES_MESSAGE,
  SEARCH_RESULT_FOR,
  KEYWORD_SEARCH_SUBDIRECTORY,
} from "../constants/constants";

export const NewsContext = createContext();

export function NewsContextProvider(props) {
  const [data, setData] = useState();
  const [searchText, setSearchText] = useState("");
  const [heading, setHeading] = useState(DEFAULT_US_TOP_HEADLINES_MESSAGE);
  const [page, setPage] = useState(1);

  useEffect(() => {
    newsapi
      .get(TOP_HEADLINES_SUBDIRECTORY, {
        params: {
          country: "us",
        },
      })
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    if (searchText) {
      setData(null);
      newsapi
        .get(KEYWORD_SEARCH_SUBDIRECTORY, {
          params: {
            q: searchText,
            page: page,
            pageSize: 6,
          },
        })
        .then((response) => {
          setData(response.data);
          setHeading(`${SEARCH_RESULT_FOR} ${searchText}`);
        })
        .catch((error) => console.log(error));
    }
  }, [searchText, page]);

  return (
    <NewsContext.Provider
      value={{
        data,
        setData,
        searchText,
        setSearchText,
        heading,
        page,
        setPage,
      }}
    >
      {props.children}
    </NewsContext.Provider>
  );
}

NewsContextProvider.propTypes = {
  children: PropTypes.any,
};
