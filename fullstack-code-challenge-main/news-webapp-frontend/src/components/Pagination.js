import React, { useContext } from "react";
import { NewsContext } from "../contexts/NewsContext";
import "../styles/pagination.css";

function Pagination() {
  const { page, setPage, data } = useContext(NewsContext);
  return (
    <div className="pagination">
      <button onClick={() => setPage((prev) => prev - 1)} disabled={page === 1}>
        Previous
      </button>
      <button
        onClick={() => setPage((prev) => prev + 1)}
        disabled={page === Math.floor(data.totalResult / 100)}
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
