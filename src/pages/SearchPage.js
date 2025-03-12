import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';  // Asegúrate de importar Link
import { searchMovies, fetchTrendingMovies } from "../tmdb";
import MovieList from "../components/MovieList";
import './SearchPage.css'; 

const SearchPage = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [recommendedMovies, setRecommendedMovies] = useState([]);
  
  const defaultImage = 'https://via.placeholder.com/300x450?text=No+Image'; // Imagen por defecto

  useEffect(() => {
    const getRecommendedMovies = async () => {
      const trendingMovies = await fetchTrendingMovies();
      setRecommendedMovies(trendingMovies);
    };
    getRecommendedMovies();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (query.trim()) {
      const results = await searchMovies(query);
      setMovies(results);
    }
  };

  return (
    <div className="search-page">
      <h2>Search for Movies</h2>
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Enter movie name..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {movies.length > 0 ? (
        <div className="movie-list">
          {movies.map((movie) => (
            <div key={movie.id} className="movie-card">
              <Link to={`/movie/${movie.id}`}>
                <img
                  src={movie.poster_path ? `https://image.tmdb.org/t/p/w300${movie.poster_path}` : defaultImage}
                  alt={movie.title}
                  className="movie-poster"
                />
                <h3>{movie.title}</h3>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <h3>Recommended Movies</h3>
          <MovieList movies={recommendedMovies} />
        </div>
      )}
    </div>
  );
};

export default SearchPage;
