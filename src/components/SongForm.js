/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addSong } from "../features/songs/songSlice";

const formStyle = css`
  display: flex;
  flex-direction: column;
  max-width: 400px;
  margin-bottom: 20px;
`;

const SongForm = () => {
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title) {
      dispatch(addSong({ id: Date.now(), title }));
      setTitle("");
    }
  };

  return (
    <form css={formStyle} onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Song Title"
      />
      <button type="submit">Add Song</button>
    </form>
  );
};

export default SongForm;
