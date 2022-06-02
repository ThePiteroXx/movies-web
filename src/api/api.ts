import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    Authorization: `Bearer ${process.env.REACT_APP_API_TOKEN}`,
    'Content-Type': 'application/json;charset=utf-8',
  },
});

export const getPopularMovies = (page = 1) => api.get(`/movie/popular&${page}`).then((response) => response.data);
export const getMovies = (page = 1) => api.get(`/discover/movie&${page}`).then((response) => response.data);
export const getNowPlayingMovies = (page = 1) => api.get(`/movie/now_playing&${page}`).then((response) => response.data);
export const getTopRatedMovies = (page = 1) => api.get(`/movie/top_rated&${page}`).then((response) => response.data);
export const getActionMovies = (page = 1) => api.get(`/discover/movie&with_geners=28&page=${page}`).then((response) => response.data);
export const getHorrorMovies = (page = 1) => api.get(`/discover/movie&with_geners=27&${page}`).then((response) => response.data);
export const getRomanceMovies = (page = 1) => api.get(`/discover/movie&with_geners=10749&${page}`).then((response) => response.data);
