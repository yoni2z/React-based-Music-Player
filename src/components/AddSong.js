import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addSong } from "../features/songs/songSlice";

const AddSong = () => {
  const [songName, setSongName] = useState("");
  const [artistName, setArtistName] = useState("");
  const dispatch = useDispatch();

  const handleAddSong = () => {
    if (songName && artistName) {
      dispatch(addSong({ name: songName, artist: artistName }));
      setSongName("");
      setArtistName("");
    }
  };

  return (
    <div className="add-song">
      <input
        type="text"
        value={songName}
        onChange={(e) => setSongName(e.target.value)}
        placeholder="Song name"
      />
      <input
        type="text"
        value={artistName}
        onChange={(e) => setArtistName(e.target.value)}
        placeholder="Artist name"
      />
      <button onClick={handleAddSong}>Add Song</button>
    </div>
  );
};

export default AddSong;
