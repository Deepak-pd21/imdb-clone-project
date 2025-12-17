import React, { useEffect, useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import "./Header.css";

// ...imports

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [query, setQuery] = useState("");
  const [watchlistCount, setWatchlistCount] = useState(0);
  const [favoritesCount, setFavoritesCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const wl = JSON.parse(localStorage.getItem("watchlist")) || [];
    const fav = JSON.parse(localStorage.getItem("favorites")) || [];
    setWatchlistCount(wl.length);
    setFavoritesCount(fav.length);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    navigate(`/search/${encodeURIComponent(query.trim())}`);
  };

  const goToWatchlist = () => navigate("/watchlist");
  const goToFavorites = () => navigate("/favorites");

  return (
    <header className={`header ${scrolled ? "header--scrolled" : ""}`}>
      <div className="headerLeft">
        <Link to="/">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/IMDB_Logo_2016.svg/2560px-IMDB_Logo_2016.svg.png"
            alt="IMDb clone logo"
            className="header__icon"
            width={96}
            height={32}
          />
        </Link>

        <nav className="headerNav">
          <NavLink
            to="/movies/popular"
            className={({ isActive }) =>
              `navLink ${isActive ? "navLink--active" : ""}`
            }
          >
            Popular
          </NavLink>
          <NavLink
            to="/movies/top_rated"
            className={({ isActive }) =>
              `navLink ${isActive ? "navLink--active" : ""}`
            }
          >
            Top Rated
          </NavLink>
          <NavLink
            to="/movies/upcoming"
            className={({ isActive }) =>
              `navLink ${isActive ? "navLink--active" : ""}`
            }
          >
            Upcoming
          </NavLink>
        </nav>
      </div>

      {/* RIGHT: search + watchlist + favorites */}
      <div className="headerRight">
        <form className="headerSearch" onSubmit={handleSubmit}>
          <input
            type="text"
            className="headerSearch__input"
            placeholder="Search movies..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </form>

        <button className="headerBtn headerBtn--secondary" onClick={goToWatchlist}>
          Watchlist {watchlistCount > 0 && `(${watchlistCount})`}
        </button>

        <button className="headerBtn headerBtn--primary" onClick={goToFavorites}>
          Favorites {favoritesCount > 0 && `(${favoritesCount})`}
        </button>
      </div>
    </header>
  );
};

export default Header;
