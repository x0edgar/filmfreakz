import axios from 'axios';

const API_KEY = "YOUR-API-KEY";
const BASE_URL = "https://api.themoviedb.org/3";


export const fetchTrendingMovies = async () => {
  const response = await axios.get(`${BASE_URL}/trending/movie/day`, {
    params: {
      api_key: API_KEY,
    },
  });
  return response.data.results;
};

export const fetchRecentMovies = async () => {
  const response = await axios.get(`${BASE_URL}/movie/now_playing`, {
    params: {
      api_key: API_KEY,
      region: "US",
    },
  });
  return response.data.results;
};

export const fetchMovieDetails = async (id) => {
  const response = await axios.get(`${BASE_URL}/movie/${id}`, {
    params: {
      api_key: API_KEY,
    },
  });
  return response.data;
};

export const searchMovies = async (query) => {
  const response = await axios.get(`${BASE_URL}/search/movie`, {
    params: {
      api_key: API_KEY,
      query,
    },
  });
  return response.data.results;
};

export const fetchMovieReviews = async (movieId) => {
  const response = await axios.get(`${BASE_URL}/movie/${movieId}/reviews`, {
    params: {
      api_key: API_KEY,
    },
  });
  return response.data.results; 
};

export const fetchMovieCredits = async (id) => {
  const response = await fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}`);
  const data = await response.json();
  return data.cast; // Devolvemos solo el elenco
};