import React, { memo, useState, useEffect } from "react";
import debounce from "../utils/debounce";

function Filters({
  search,
  setSearch,
  year,
  setYear,
  successOnly,
  setSuccessOnly,
  showFavorites,
  setShowFavorites,
}) {
  const [localSearch, setLocalSearch] = useState(search);

  // ✅ Debounced search with cleanup support
  useEffect(() => {
    const debounced = debounce((value) => setSearch(value), 300);
    debounced(localSearch);

    // cleanup: cancel any pending debounce on unmount or value change
    return () => {
      debounced.cancel?.();
    };
  }, [localSearch, setSearch]);

  return (
    <section className="filters">
      {/* Search */}
      <div className="search-wrapper">
        <input
          type="text"
          placeholder="🔍 Search mission"
          value={localSearch}
          onChange={(e) => setLocalSearch(e.target.value)}
          className="filter-input"
        />
      </div>

      {/* Year Filter */}
      <select
        value={year}
        onChange={(e) => setYear(e.target.value)}
        className="filter-select"
      >
        <option value="">All Years</option>
        {Array.from({ length: 2023 - 2006 + 1 }, (_, i) => 2006 + i).map((y) => (
          <option key={y} value={y}>
            {y}
          </option>
        ))}
      </select>

      {/* Success Filter */}
      <label className="filter-toggle">
        <input
          type="checkbox"
          checked={successOnly}
          onChange={(e) => setSuccessOnly(e.target.checked)}
        />
        Only Successful Launches
      </label>

      {/* Favorites Filter */}
      <label className="filter-toggle">
        <input
          type="checkbox"
          checked={showFavorites}
          onChange={(e) => setShowFavorites(e.target.checked)}
        />
        Show Favorites Only
      </label>
    </section>
  );
}

// ✅ Memoized to avoid unnecessary re-renders
export default memo(Filters);
