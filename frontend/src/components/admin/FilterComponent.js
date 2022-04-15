export const FilterComponent = ({ filterText, onFilter, onClear }) => {
  return (
    <div style={{ padding: "20px" }}>
      <input
        type="text"
        className="form-control"
        placeholder="Search..."
        value={filterText}
        onChange={onFilter}
      />
      {filterText && (
        <button className="btn btn-link" onClick={onClear}>
          Clear
        </button>
      )}
    </div>
  );
};
