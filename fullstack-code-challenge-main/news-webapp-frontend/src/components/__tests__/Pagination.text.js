import { render, screen, fireEvent } from "@testing-library/react";
import Pagination from "../Pagination";
import { NewsContext } from "../../contexts/NewsContext";

describe("Pagination Component", () => {
  it("renders 'Previous' and 'Next' buttons", () => {
    const mockContext = {
      page: 1,
      setPage: jest.fn(),
      data: { totalResult: 200 },
    };

    render(
      <NewsContext.Provider value={mockContext}>
        <Pagination />
      </NewsContext.Provider>
    );

    const prevButton = screen.getByText("Previous");
    const nextButton = screen.getByText("Next");

    expect(prevButton).toBeInTheDocument();
    expect(nextButton).toBeInTheDocument();
  });

  it("'Previous' button is disabled on the first page", () => {
    const mockContext = {
      page: 1,
      setPage: jest.fn(),
      data: { totalResult: 200 },
    };

    render(
      <NewsContext.Provider value={mockContext}>
        <Pagination />
      </NewsContext.Provider>
    );

    const prevButton = screen.getByText("Previous");
    expect(prevButton).toBeDisabled();
  });

  it("'Next' button is disabled on the last page", () => {
    const mockContext = {
      page: 2,
      setPage: jest.fn(),
      data: { totalResult: 200 },
    };

    render(
      <NewsContext.Provider value={mockContext}>
        <Pagination />
      </NewsContext.Provider>
    );

    const nextButton = screen.getByText("Next");
    expect(nextButton).toBeDisabled();
  });

  it("clicking 'Next' button calls setPage with incremented value", () => {
    const mockContext = {
      page: 1,
      setPage: jest.fn(),
      data: { totalResult: 200 },
    };

    render(
      <NewsContext.Provider value={mockContext}>
        <Pagination />
      </NewsContext.Provider>
    );

    const nextButton = screen.getByText("Next");
    fireEvent.click(nextButton);

    expect(mockContext.setPage).toHaveBeenCalledWith(expect.any(Function));
    expect(mockContext.setPage).toHaveBeenCalledTimes(1);
  });

  it("clicking 'Previous' button calls setPage with decremented value", () => {
    const mockContext = {
      page: 2,
      setPage: jest.fn(),
      data: { totalResult: 200 },
    };

    render(
      <NewsContext.Provider value={mockContext}>
        <Pagination />
      </NewsContext.Provider>
    );

    const prevButton = screen.getByText("Previous");
    fireEvent.click(prevButton);

    expect(mockContext.setPage).toHaveBeenCalledWith(expect.any(Function));
    expect(mockContext.setPage).toHaveBeenCalledTimes(1);
  });
});
