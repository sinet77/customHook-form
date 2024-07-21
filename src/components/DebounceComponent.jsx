import React, { useState, useCallback } from "react";

import useDebounce from "/src/hooks/CustomDebounce";

const DebounceExample = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedValue, setDebouncedValue] = useState("");

  const handleSearch = useCallback(() => {
    setDebouncedValue(searchTerm);
  }, [searchTerm]);

  useDebounce(handleSearch, 1000, [searchTerm]);

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search..."
      />
      <p>Debounced Value: {debouncedValue}</p>
    </div>
  );
};

export default DebounceExample;
