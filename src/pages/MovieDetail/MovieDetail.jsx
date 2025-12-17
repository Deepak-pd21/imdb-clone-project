import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./MovieDetail.css";

const MovieDetail = () => {
  const [currentMovieDetail, setMovie] = useState();
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const { id } = useParams();

  const getData = () => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`
    )
      .then((response) => response.json())
      .then((data) => setMovie(data));
  };

  const checkLists = (movieId) => {
    const wl = JSON.parse(localStorage.getItem("watchlist")) || [];
    const fav = JSON.parse(localStorage.getItem("favorites")) || [];
    setIsInWatchlist(wl.some((m) => m.id === Number(movieId)));
    setIsFavorite(fav.some((m) => m.id === Number(movieId)));
  };

  useEffect(() => {
    getData();
    window.scrollTo(0, 0);
    checkLists(id);
    // eslint-disable-next-line
  }, [id]);

  // save compact movie object
  const addToList = (key, movie) => {
    const existing = JSON.parse(localStorage.getItem(key)) || [];
    const already = existing.some((m) => m.id === movie.id);
    if (already) return;

    const movieToSave = {
      id: movie.id,
      title: movie.title || movie.original_title,
      poster_path: movie.poster_path,
    };

    const updated = [...existing, movieToSave];
    localStorage.setItem(key, JSON.stringify(updated));
  };

  const removeFromList = (key, movieId) => {
    const existing = JSON.parse(localStorage.getItem(key)) || [];
    const updated = existing.filter((m) => m.id !== movieId);
    localStorage.setItem(key, JSON.stringify(updated));
  };

  const handleToggleWatchlist = () => {
    if (!currentMovieDetail) return;

    if (isInWatchlist) {
      removeFromList("watchlist", currentMovieDetail.id);
      setIsInWatchlist(false);
    } else {
      addToList("watchlist", currentMovieDetail);
      setIsInWatchlist(true);
    }
  };

  const handleToggleFavorite = () => {
    if (!currentMovieDetail) return;

    if (isFavorite) {
      removeFromList("favorites", currentMovieDetail.id);
      setIsFavorite(false);
    } else {
      addToList("favorites", currentMovieDetail);
      setIsFavorite(true);
    }
  };

  return (
    <div className="movie">
      <div className="movie__intro">
        <img
          className="movie__backdrop"
          src={`https://image.tmdb.org/t/p/original${
            currentMovieDetail ? currentMovieDetail.backdrop_path : ""
          }`}
          alt="movie-cover"
        />
      </div>
      <div className="movie__detail">
        <div className="movie__detailLeft">
          <div className="movie__posterBox">
            <img
              className="movie__poster"
              src={`https://image.tmdb.org/t/p/original${
                currentMovieDetail ? currentMovieDetail.poster_path : ""
              }`}
              alt="movie-poster"
            />
          </div>
        </div>
        <div className="movie__detailRight">
          <div className="movie__detailRightTop">
            <div className="movie__name">
              {currentMovieDetail ? currentMovieDetail.original_title : ""}
            </div>
            <div className="movie__tagline">
              {currentMovieDetail ? currentMovieDetail.tagline : ""}
            </div>
            <div className="movie__rating">
              {currentMovieDetail
                ? currentMovieDetail.vote_average.toFixed(1)
                : ""}{" "}
              <i className="fas fa-star" />
              <span className="movie__voteCount">
                {currentMovieDetail
                  ? "(" + currentMovieDetail.vote_count + ") votes"
                  : ""}
              </span>
            </div>
            <div className="movie__runtime">
              {currentMovieDetail
                ? currentMovieDetail.runtime + " mins"
                : ""}
            </div>
            <div className="movie__releaseDate">
              {currentMovieDetail
                ? "Release Date: " + currentMovieDetail.release_date
                : ""}
            </div>
            <div className="movie__genres">
              {currentMovieDetail && currentMovieDetail.genres
                ? currentMovieDetail.genres.map((genre) => (
                    <span className="movie__genre" id={genre.id} key={genre.id}>
                      {genre.name}
                    </span>
                  ))
                : ""}
            </div>

            {/* Watchlist / Favorites actions */}
            <div className="movie__actions">
              <button
                className="movieActionBtn movieActionBtn--secondary"
                onClick={handleToggleWatchlist}
              >
                <i className="fa fa-bookmark movieActionIcon" />
                {isInWatchlist ? " Remove from Watchlist" : " Add to Watchlist"}
              </button>

              <button
                className="movieActionBtn movieActionBtn--primary"
                onClick={handleToggleFavorite}
              >
                {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
              </button>
            </div>
          </div>

          <div className="movie__detailRightBottom">
            <div className="descriptionText">Description</div>
            <div>{currentMovieDetail ? currentMovieDetail.overview : ""}</div>
          </div>
        </div>
      </div>

      <div className="movie__links">
        {currentMovieDetail && currentMovieDetail.homepage && (
          <a
            href={currentMovieDetail.homepage}
            target="_blank"
            rel="noreferrer"
            style={{ textDecoration: "none" }}
          >
            <p>
              <span className="movie__homeButton movie__Button">
                Homepage <i className="newTab fas fa-external-link-alt"></i>
              </span>
            </p>
          </a>
        )}
        {currentMovieDetail && currentMovieDetail.imdb_id && (
          <a
            href={"https://www.imdb.com/title/" + currentMovieDetail.imdb_id}
            target="_blank"
            rel="noreferrer"
            style={{ textDecoration: "none" }}
          >
            <p>
              <span className="movie__imdbButton movie__Button">
                IMDb<i className="newTab fas fa-external-link-alt"></i>
              </span>
            </p>
          </a>
        )}
      </div>

      <div className="movie__production">
        {currentMovieDetail &&
          currentMovieDetail.production_companies &&
          currentMovieDetail.production_companies.map((company) => (
            <span className="productionCompanyImage" key={company.id}>
              {company.logo_path && (
                <>
                  <img
                    className="movie__productionCompany"
                    src={
                      "https://image.tmdb.org/t/p/original" + company.logo_path
                    }
                    alt="movie-company"
                  />
                  <span>{company.name}</span>
                </>
              )}
            </span>
          ))}
      </div>
    </div>
  );
};

export default MovieDetail;
