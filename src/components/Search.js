import musicIcon from "../assets/images/music.png";
import React, { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSongsRequest,
  clearSearchResults,
  addSongRequest,
} from "../redux/songSlice";
import { debounce } from "lodash";

const Search = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const searchResults = useSelector((state) => state.songs.searchResults);

  const debouncedSearch = useCallback(
    debounce((query) => dispatch(fetchSongsRequest(query)), 300),
    [dispatch]
  );

  const handleSearch = useCallback(() => {
    debouncedSearch(query);
  }, [query, debouncedSearch]);

  const handleBack = () => {
    dispatch(clearSearchResults());
    setQuery("");
  };

  const handleAddSong = useCallback(
    (song) => {
      dispatch(addSongRequest(song));
    },
    [dispatch]
  );

  return (
    <div className="search-container my-3 text-light">
      <div className="input-group mb-3">
        <button className="btn btn-outline-secondary" onClick={handleBack}>
          Clear
        </button>
        <input
          className="form-control bg-transparent text-light text-center"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search here"
        />
        <button className="btn btn-outline-secondary" onClick={handleSearch}>
          Search
        </button>
      </div>

      <div style={{ maxHeight: "300px", overflowY: "auto" }}>
        {searchResults.map((song) => (
          <div className="row p-3 align-items-center" key={song.id}>
            <div className="col-9">
              <img
                className="music-icon mx-2"
                src={musicIcon}
                alt={song.name}
                width="50"
              />
              <span>{song.name}</span>
            </div>
            <div className="col-3">
              <button
                className="btn btn-success w-100"
                onClick={() => handleAddSong(song)}
              >
                Add
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;
