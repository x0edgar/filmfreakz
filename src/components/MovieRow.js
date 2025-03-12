import React from 'react';

const MovieRow = ({ movies }) => {
  return (
    <div className="movie-row">
      {movies.map((movie) => (
        <img
          key={movie.id}
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
      ))}
    </div>
  );
};

export default MovieRow;