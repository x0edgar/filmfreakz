import { useEffect, useState } from "react";
import { fetchTrendingMovies, fetchRecentMovies } from "../tmdb";
import MovieList from "../components/MovieList";
import './HomePage.css'; 

const HomePage = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [recentMovies, setRecentMovies] = useState([]);

  useEffect(() => {
    const getTrendingMovies = async () => {
      const trendingData = await fetchTrendingMovies();
      setTrendingMovies(trendingData);
    };
    
    const getRecentMovies = async () => {
      const recentData = await fetchRecentMovies();
      setRecentMovies(recentData);
    };
    
    getTrendingMovies();
    getRecentMovies();
  }, []);

  return (
    <div className="homepage">
      <div className="movie-section">
        <h1>Trending Movies</h1>
        <MovieList movies={trendingMovies} />
      </div>

      {/* Sección de películas recientes */}
      <div className="movie-section">
        <h1>Recent Movies</h1>
        <MovieList movies={recentMovies} />
      </div>
    </div>
  );
};

export default HomePage;