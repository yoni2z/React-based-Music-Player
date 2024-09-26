import { call, put, takeEvery } from "redux-saga/effects";
import axios from "axios";
import {
  fetchInitialSongsRequest,
  fetchInitialSongsSuccess,
  fetchInitialSongsFailure,
  fetchSongsRequest,
  fetchSongsSuccess,
  fetchSongsFailure,
} from "./songSlice";

const API_KEY = "a3b112f30ba6be3619b58f897992df62";
const API_URL = "https://ws.audioscrobbler.com/2.0/";

function* fetchInitialSongsSaga() {
  try {
    const response = yield call(fetchInitialSongsFromAPI);
    const songsWithImages = response.data.tracks.track
      .slice(0, 5)
      .map((song) => ({
        id: song.mbid || song.url, // Ensure each song has a unique ID
        name: song.name,
        artist: song.artist.name,
        imageUrl: song.image[2]["#text"], 
      }));
    yield put(fetchInitialSongsSuccess(songsWithImages));
  } catch (error) {
    yield put(fetchInitialSongsFailure(error.message));
  }
}

const fetchInitialSongsFromAPI = () =>
  axios.get(API_URL, {
    params: {
      method: "chart.gettoptracks", 
      api_key: API_KEY,
      format: "json",
    },
  });

function* fetchSongsSaga(action) {
  try {
    const response = yield call(fetchSongsFromAPI, action.payload);
    yield put(fetchSongsSuccess(response.data.results.trackmatches.track));
  } catch (error) {
    yield put(fetchSongsFailure(error.message));
  }
}

const fetchSongsFromAPI = (query) =>
  axios.get(API_URL, {
    params: {
      method: "track.search",
      track: query,
      api_key: API_KEY,
      format: "json",
    },
  });

export function* songSaga() {
  yield takeEvery(fetchInitialSongsRequest.type, fetchInitialSongsSaga);
  yield takeEvery(fetchSongsRequest.type, fetchSongsSaga);
}
