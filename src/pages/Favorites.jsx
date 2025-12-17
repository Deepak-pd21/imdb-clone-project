import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./ListPage.css";

const Favorites = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("favorites")) || [];
    setMovies(stored);
  }, []);

  const handleRemove = (id) => {
    const updated = movies.filter((m) => m.id !== id);
    setMovies(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  if (!movies.length) {
    return <div className="listPage">No movies in Favorites yet.</div>;
  }

  return (
    <div className="listPage">
      <h1>Favorites</h1>
      <div className="listGrid">
        {movies.map((movie) => (
          <div key={movie.id} className="listCard">
            <Link to={`/movie/${movie.id}`}>
              <img
                src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                alt={movie.title}
              />
              <p>{movie.title}</p>
            </Link>

            <button
              className="listRemoveBtn"
              onClick={() => handleRemove(movie.id)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;
