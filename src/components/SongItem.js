import React from "react";
import { useDispatch } from "react-redux";
import { deleteSong, updateSong } from "../features/songs/songSlice";

const SongItem = ({ song }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteSong(song.mbid || song.name));
  };

  const handleUpdate = () => {
    const updatedSong = { ...song, name: prompt("New song name:", song.name) };
    dispatch(updateSong(updatedSong));
  };

  return (
    <li className="song-item">
      {song.name} by {song.artist}
      <button onClick={handleUpdate}>Update</button>
      <button onClick={handleDelete}>Delete</button>
    </li>
  );
};

export default SongItem;
