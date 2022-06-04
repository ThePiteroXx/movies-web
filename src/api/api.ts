import axios from 'axios';
import { FetchFunction } from 'types';

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    Authorization: `Bearer ${process.env.REACT_APP_API_TOKEN}`,
    'Content-Type': 'application/json;charset=utf-8',
  },
});

export const getPopularMovies: FetchFunction = (page = 1) => api.get(`/movie/popular?page=${page}`).then((response) => response.data);
export const getMovies: FetchFunction = (page = 1) => api.get(`/discover/movie?page=${page}`).then((response) => response.data);
export const getNowPlayingMovies: FetchFunction = (page = 1) => api.get(`/movie/now_playing?page=${page}`).then((response) => response.data);
export const getTopRatedMovies: FetchFunction = (page = 1) => api.get(`/movie/top_rated?page=${page}`).then((response) => response.data);
export const getActionMovies: FetchFunction = (page = 1) => api.get(`/discover/movie?with_genres=28&page=${page}`).then((response) => response.data);
export const getHorrorMovies: FetchFunction = (page = 1) => api.get(`/discover/movie?with_genres=27&page=${page}`).then((response) => response.data);
export const getRomanceMovies: FetchFunction = (page = 1) =>
  api.get(`/discover/movie?with_genres=10749&page=${page}`).then((response) => response.data);
