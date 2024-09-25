import musicIcon from "../assets/images/music.png";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchInitialSongsRequest,
  deleteSong,
  updateSong,
} from "../redux/songSlice";

const SongList = () => {
  const list = useSelector((state) => state.songs.list);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchInitialSongsRequest()); // Fetch initial songs on mount
  }, [dispatch]);

  const [editSong, setEditSong] = useState(null);
  const [newName, setNewName] = useState("");
  const [dropdownVisible, setDropdownVisible] = useState(null); // For kebab menu visibility

  const handleUpdate = (song) => {
    setEditSong(song);
    setNewName(song.name);
  };

  const handleSave = () => {
    if (editSong) {
      dispatch(updateSong({ ...editSong, name: newName }));
      setEditSong(null);
      setNewName("");
    }
  };

  // Toggle dropdown for the selected song
  const toggleDropdown = (songId) => {
    if (dropdownVisible === songId) {
      setDropdownVisible(null);
    } else {
      setDropdownVisible(songId);
    }
  };

  return (
    <div className="song-list m-3 m-md-5">
      <h2 className="fs-4 fw-bold">My Song List</h2>
      <hr />
      <ul className="list-unstyled">
        {list.map((song) => (
          <li className="row my-3 align-items-center" key={song.id}>
            <div className="col-10 d-flex align-items-center">
              <img
                src={musicIcon}
                alt={song.name}
                width="50"
                className="music-icon mx-2"
              />
              <span>
                {song.name} by {song.artist}
              </span>
            </div>

            {/* Three-dots*/}
            <div className="col-2 d-flex justify-content-end">
              <div className="dropdown">
                <span
                  className="three-dots"
                  onClick={() => toggleDropdown(song.id)}
                  style={{ cursor: "pointer", fontSize: "24px" }}
                >
                  &#x22EE; {/* Three vertical dots */}
                </span>
                {dropdownVisible === song.id && (
                  <div className="dropdown-content">
                    <button
                      className="btn btn-outline-light w-100 my-1"
                      onClick={() => handleUpdate(song)}
                    >
                      Update
                    </button>
                    <button
                      className="btn btn-danger w-100"
                      onClick={() => dispatch(deleteSong(song.id))}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>

      {editSong && (
        <div className="update-container mt-4">
          <h3 className="fs-5">Update Song</h3>
          <input
            className="form-control mb-2"
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
          <div className="d-flex">
            <button className="btn btn-success mx-2" onClick={handleSave}>
              Save
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => setEditSong(null)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SongList;
