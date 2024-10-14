import { render, screen, fireEvent } from "@testing-library/react";
import SearchBar from "../SearchBar";
import { NewsContext } from "../../contexts/NewsContext";

describe("SearchBar Component", () => {
  it("Search button is present", async () => {
    const mockContext = {
      setSearchText: jest.fn(),
    };
    render(
      <NewsContext.Provider value={mockContext}>
        <SearchBar />
      </NewsContext.Provider>
    );
    const searchButtonElement = screen.getByTestId("search-button");
    expect(searchButtonElement).toBeInTheDocument();
  });

  it("Search input is present and editable", async () => {
    const mockContext = {
      setSearchText: jest.fn(),
    };
    render(
      <NewsContext.Provider value={mockContext}>
        <SearchBar />
      </NewsContext.Provider>
    );

    const searchInputElement = screen.getByPlaceholderText(
      "Search for articles"
    );
    expect(searchInputElement).toBeInTheDocument();

    fireEvent.change(searchInputElement, { target: { value: "React" } });
    expect(searchInputElement.value).toBe("React");
  });

  it("Search button click triggers search", async () => {
    const mockContext = {
      setSearchText: jest.fn(),
    };
    render(
      <NewsContext.Provider value={mockContext}>
        <SearchBar />
      </NewsContext.Provider>
    );

    const searchInputElement = screen.getByPlaceholderText(
      "Search for articles"
    );
    const searchButtonElement = screen.getByTestId("search-button");

    fireEvent.change(searchInputElement, { target: { value: "React" } });
    fireEvent.click(searchButtonElement);

    expect(mockContext.setSearchText).toHaveBeenCalledWith("React");
  });

  it("Search on 'Enter' key press", async () => {
    const mockContext = {
      setSearchText: jest.fn(),
    };
    render(
      <NewsContext.Provider value={mockContext}>
        <SearchBar />
      </NewsContext.Provider>
    );

    const searchInputElement = screen.getByPlaceholderText(
      "Search for articles"
    );

    fireEvent.change(searchInputElement, { target: { value: "React" } });
    fireEvent.keyDown(searchInputElement, { key: "Enter", code: "Enter" });

    expect(mockContext.setSearchText).toHaveBeenCalledWith("React");
  });
});
