import "./styles/custom-input.scss";
const CustomSearchInput = ({ setState }) => {
  return (
    <div className="search-container">
      <i className="fa-solid fa-magnifying-glass loop"></i>
      <input
        className="search-bar"
        placeholder="search"
        type="text"
        onChange={(event) => {
          setState(event.target.value);
        }}
      />
    </div>
  );
};
export default CustomSearchInput;
