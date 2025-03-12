import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieDetails, fetchMovieReviews, fetchMovieCredits } from "../tmdb";
import './MovieDetailPage.css';
import Rating from "react-rating";  // Importamos react-rating

const MovieDetailPage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [userRating, setUserRating] = useState(0); 
  const [userReview, setUserReview] = useState("");
  const [cast, setCast] = useState([]);

  useEffect(() => {
    const getMovieDetails = async () => {
      const data = await fetchMovieDetails(id);
      setMovie(data);
    };
    const getMovieReviews = async () => {
      const movieReviews = await fetchMovieReviews(id);
      setReviews(movieReviews);
    };
    const getMovieCredits = async () => {
      const movieCast = await fetchMovieCredits(id);
      setCast(movieCast.slice(0, 5));
    };
    getMovieDetails();
    getMovieReviews();
    getMovieCredits();
  }, [id]);

  if (!movie) {
    return <p>Loading...</p>;
  }

  // Manejar el rating de las estrellas en fracciones
  const handleRatingChange = (newRating) => {
    setUserRating(newRating);
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();
    const newReview = {
      author: "Current User",
      content: userReview,
      rating: userRating,
    };
    setReviews([newReview, ...reviews]);
    setUserReview("");
    setUserRating(0);
  };

  return (
    <div className="movie-detail-page">
      {/* Contenedor principal */}
      <div className="main-content">
        <div className="movie-poster">
          <img 
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
            alt={movie.title} 
          />
        </div>
        
        <div className="movie-info">
          <h1>{movie.title}</h1>
          <p className="movie-tagline">{movie.tagline}</p>
          <p className="movie-overview">{movie.overview}</p>
          <div className="movie-details">
            <p><strong>Release Date:</strong> {movie.release_date}</p>
            <p><strong>Duration:</strong> {movie.runtime} minutes</p>
            <p><strong>Genres:</strong> {movie.genres.map(genre => genre.name).join(', ')}</p>
          </div>

          {/* Sección del casting */}
          <h2>Cast</h2>
          <div className="movie-cast">
            {cast.map((actor) => (
              <div key={actor.cast_id} className="actor">
                <img 
                  src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`} 
                  alt={actor.name} 
                  className="actor-photo"
                />
                <p><strong>{actor.name}</strong> as {actor.character}</p>
              </div>
            ))}
          </div>

          {/* Formulario de calificación */}
          <form onSubmit={handleSubmitReview} className="review-form">
            <label>Your Rating:</label>
            
            {/* Sistema de calificación con estrellas personalizadas */}
            <Rating
              fractions={4}  // Permitir fracciones de 0.25
              initialRating={userRating}
              onChange={handleRatingChange}
              fullSymbol={<span className="star full">★</span>}
              emptySymbol={<span className="star empty">☆</span>}
            />
            
            <textarea
              value={userReview}
              onChange={(e) => setUserReview(e.target.value)}
              placeholder="Write your review"
              rows="4"
            />
            <button type="submit">Submit Review</button>
          </form>
        </div>
      </div>

      {/* Contenedor para reseñas */}
      <div className="review-container">
        <h2>User Reviews</h2>
        {reviews.length > 0 ? (
          reviews.map((review, index) => (
            <div key={index} className="review">
              <h3>{review.author}</h3>
              <p>{review.content}</p>
              <strong>Rating: {review.rating || "N/A"}</strong>
            </div>
          ))
        ) : (
          <p>No reviews available</p>
        )}
      </div>
    </div>
  );
};

export default MovieDetailPage;
