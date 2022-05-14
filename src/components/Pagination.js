import "./pagination.scss";
const Pagination = ({ page, setPage, count, limit, setSkip }) => {
  const numberOfPage = count / limit;
  return (
    <div className="pagination-btn">
      <button
        disabled={page === 1 && true}
        onClick={() => {
          setSkip((prevState) => prevState - limit);
          setPage((prevState) => prevState - 1);
        }}
      >
        skip
      </button>
      <span>
        Page :{page}/ {Math.floor(count / limit)}
      </span>

      <button
        disabled={page > Math.floor(numberOfPage) && true}
        onClick={() => {
          setSkip((prevState) => prevState + limit);
          setPage((prevState) => prevState + 1);
        }}
      >
        skip
      </button>
    </div>
  );
};

export default Pagination;
