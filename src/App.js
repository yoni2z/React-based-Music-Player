import React from "react";
import Search from "./components/Search";
import SongList from "./components/SongList";
/** @jsxImportSource @emotion/react */
import { Global, css } from "@emotion/react";

const GlobalStyles = css`
  .container-fluid {
    padding: 20px;
    font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
      "Lucida Sans", Arial, sans-serif;
  }

  .song-list {
    list-style: none;
    color: white;
  }

  .music-icon {
    width: 30px;
    height: 30px;
  }

  .container-heading {
    font-size: 50px;
    color: white;
  }

  .three-dots {
    font-size: 24px;
    cursor: pointer;
  }

  .dropdown-content {
    position: absolute;
    right: 0;
    background-color: #333;
    border-radius: 5px;
    z-index: 1;
    display: flex;
    flex-direction: column;
    padding: 10px;
    min-width: 100px;
  }

  .dropdown-content button {
    background: none;
    border: none;
    color: white;
    text-align: left;
    padding: 5px 10px;
    cursor: pointer;
  }

  .dropdown-content button:hover {
    background-color: #555;
  }
`;

const App = () => {
  return (
    <div className="container text-center">
      <Global styles={GlobalStyles} />
      <div className="row justify-content-between align-items-center">
        <div className="col-12 col-md-6">
          <h1 className="container-heading">Music Player</h1>
        </div>
        <div className="col-12 col-md-6">
          <Search />
        </div>
      </div>
      <SongList />
    </div>
  );
};

export default App;
