import React from "react";
import News from "../News";
import { render, screen } from "@testing-library/react";
import { NewsContext } from "../../contexts/NewsContext";

const HOMEPAGE_HEADER = "DAILY NEWS";
const ARTICLE_NULL_ERROR_MESSAGE = "Oops ! No articles found...";

describe("<News />", () => {
  describe("when api data is fetched", () => {
    const fakeData = {
      articles: [
        {
          source: {
            id: null,
            name: "Business Standard",
          },
          author: "author",
          title: "Test Article",
          description: "Test Description",
          url: "https://www.example.com",
          urlToImage: "https://media.com/1607583401-071.jpg",
          publishedAt: "2022-02-14T21:30:00Z",
          content: "Test content… [+2410 chars]",
        },
      ],
    };

    beforeEach(() => {
      render(
        <NewsContext.Provider value={{ data: fakeData, searchText: "" }}>
          <News />
        </NewsContext.Provider>
      );
    });

    it("renders the homepage header", () => {
      expect(screen.getByText(HOMEPAGE_HEADER)).toBeInTheDocument();
    });

    it("renders articles when data is present", () => {
      expect(screen.getByText("Test Article")).toBeInTheDocument();
      expect(screen.getByText("Test Description")).toBeInTheDocument();
    });

    it("does not render 'No articles found' message when articles exist", () => {
      expect(
        screen.queryByText(ARTICLE_NULL_ERROR_MESSAGE)
      ).not.toBeInTheDocument();
    });

    it("renders Pagination component when searchText is present", () => {
      const mockSearchText = "Test";
      render(
        <NewsContext.Provider
          value={{ data: fakeData, searchText: mockSearchText }}
        >
          <News />
        </NewsContext.Provider>
      );
      expect(screen.getByText("Next")).toBeInTheDocument();
    });
  });

  describe("when no articles are fetched", () => {
    const emptyData = { articles: [] };

    beforeEach(() => {
      render(
        <NewsContext.Provider value={{ data: emptyData, searchText: "" }}>
          <News />
        </NewsContext.Provider>
      );
    });

    it("renders 'No articles found' message", () => {
      expect(screen.getByText(ARTICLE_NULL_ERROR_MESSAGE)).toBeInTheDocument();
    });

    it("does not render articles when none exist", () => {
      expect(screen.queryByText("Test Article")).not.toBeInTheDocument();
    });
  });

  describe("when data is not yet fetched", () => {
    it("renders the Loader component", () => {
      render(
        <NewsContext.Provider value={{ data: null, searchText: "" }}>
          <News />
        </NewsContext.Provider>
      );
      expect(screen.getByTestId("loader")).toBeInTheDocument();
    });
  });
});
