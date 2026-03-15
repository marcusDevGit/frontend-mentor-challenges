import { useState, useRef, useEffect } from "react";
import "./SearchBar.css";
import searchIcon from "../assets/images/icon-search.svg";
import loadingIcon from "../assets/images/icon-loading.svg";

export function SearchBar({
  searchResults = [],
  searchStatus,
  searchError,
  onSearch,
  onSelectLocation,
}) {
  const [query, setQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const skipNextAutoSearchRef = useRef(false);
  const trimmedQuery = query.trim();

  useEffect(() => {
    if (skipNextAutoSearchRef.current) {
      skipNextAutoSearchRef.current = false;
      return;
    }

    if (trimmedQuery.length < 2) return;

    const timeoutId = window.setTimeout(() => {
      onSearch(trimmedQuery);
    }, 300);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [trimmedQuery, onSearch]);

  // Fecha dropdown ao clicar fora
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }

    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdown]);

  function handleInputChange(event) {
    const nextQuery = event.target.value;
    setQuery(nextQuery);
    setShowDropdown(nextQuery.trim().length >= 2);
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (trimmedQuery.length >= 2) {
      onSearch(trimmedQuery);
      setShowDropdown(true);
    }
  }

  function handleSelect(location) {
    skipNextAutoSearchRef.current = true;
    setQuery(location.displayName);
    setShowDropdown(false);
    onSelectLocation(location);
  }

  return (
    <form className="wa-search" onSubmit={handleSubmit} ref={dropdownRef}>
      <div className="wa-search-row">
        <div className="wa-search-input-wrapper">
          <img src={searchIcon} alt="" />
          <input
            type="text"
            placeholder="Search for a place..."
            value={query}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit" className="wa-search-btn">
          Search
        </button>
      </div>

      {showDropdown && (
        <div className="wa-search-dropdown">
          {searchStatus === "searching" && (
            <div className="wa-search-status">
              <img src={loadingIcon} alt="" />
              Search in progress
            </div>
          )}

          {searchStatus === "not-found" && (
            <div className="wa-search-status wa-search-status--not-found">
              Not found
            </div>
          )}

          {searchStatus === "error" && (
            <div className="wa-search-status wa-search-status--error">
              {searchError || "Error"}
            </div>
          )}

          {searchStatus !== "searching" &&
            searchStatus !== "not-found" &&
            searchStatus !== "error" &&
            searchResults.map((result) => (
            <button
              key={result.id}
              type="button"
              className="wa-search-result"
              onClick={() => handleSelect(result)}
            >
              {result.displayName}
            </button>
            ))}
        </div>
      )}
    </form>
  );
}
