import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  list: [],
  searchResults: [],
  loading: false,
  error: null,
};

const songSlice = createSlice({
  name: "songs",
  initialState,
  reducers: {
    fetchInitialSongsRequest: (state) => {
      state.loading = true;
    },
    fetchInitialSongsSuccess: (state, action) => {
      state.list = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchInitialSongsFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    fetchSongsRequest: (state) => {
      state.loading = true;
    },
    fetchSongsSuccess: (state, action) => {
      state.searchResults = action.payload; // Update search results
      state.loading = false;
      state.error = null;
    },
    fetchSongsFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    addSong: (state, action) => {
      const songWithUniqueId = { ...action.payload, id: uuidv4() };
      state.list.push(songWithUniqueId);
    },
    updateSong: (state, action) => {
      const index = state.list.findIndex(
        (song) => song.id === action.payload.id
      );
      if (index !== -1) {
        state.list[index] = action.payload;
      }
    },
    deleteSong: (state, action) => {
      state.list = state.list.filter((song) => song.id !== action.payload);
    },
    clearSearchResults: (state) => {
      state.searchResults = [];
    },
  },
});

export const {
  fetchInitialSongsRequest,
  fetchInitialSongsSuccess,
  fetchInitialSongsFailure,
  fetchSongsRequest,
  fetchSongsSuccess,
  fetchSongsFailure,
  addSong,
  updateSong,
  deleteSong,
  clearSearchResults,
} = songSlice.actions;

export default songSlice.reducer;
