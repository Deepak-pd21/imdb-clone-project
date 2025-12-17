import React, { useEffect, useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    // later you can navigate to a /search route and use this query
  navigate(`/search/${encodeURIComponent(query.trim())}`);  };

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

      {/* right side search */}
      <form className="headerSearch" onSubmit={handleSubmit}>
        <input
          type="text"
          className="headerSearch__input"
          placeholder="Search movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </form>
    </header>
  );
};

export default Header;
