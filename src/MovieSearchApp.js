import React, { useState } from "react";
import "./styles.css";


const API_URL = "https://www.omdbapi.com/?apikey=6933d31b&s=";



const MovieSearchApp = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const searchMovies = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setError("");
    setMovies([]);
    try {
      const response = await fetch(`${API_URL}${query}`);
      const data = await response.json();
      if (data.Response === "True") {
        setMovies(data.Search);
      } else {
        setError("No movies found. Try a different search!");
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
      setError("Something went wrong. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="app-container">
      <h1 className="fade-in">🎬 Movie Explorer 🎥</h1>
      <p className="tagline">Find your favorite movies and discover hidden gems!</p>
      <div className="search-box slide-up">
        <input
          type="text"
          placeholder="Type a movie name..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={searchMovies} disabled={loading} className="pulse-button">
          {loading ? "Searching..." : "🔍 Search"}
        </button>
      </div>
      {error && <p className="error-message shake">{error}</p>}
      <div className="movie-list">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <div key={movie.imdbID} className="movie-card zoom-in">
              <img src={movie.Poster} alt={movie.Title} className="hover-zoom" />
              <h3>{movie.Title}</h3>
              <p className="year-badge">📅 {movie.Year}</p>
            </div>
          ))
        ) : (
          !loading && <p className="no-results">Start searching for movies!</p>
        )}
      </div>
    </div>
  );
};

export default MovieSearchApp;
