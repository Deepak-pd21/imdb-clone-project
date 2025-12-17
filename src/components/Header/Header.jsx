import React, { useEffect, useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import "./Header.css";
import { useWatchlist } from "../../context/WatchlistContext";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [query, setQuery] = useState("");
  const { watchlist, favorites } = useWatchlist();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
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
          Watchlist ({watchlist.length})
        </button>

        <button className="headerBtn headerBtn--primary" onClick={goToFavorites}>
          Favorites ({favorites.length})
        </button>
      </div>
    </header>
  );
};

export default Header;
