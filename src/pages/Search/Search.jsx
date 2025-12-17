import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "../../components/Card/Card";
import "../Home/Home.css"; // optional for basic layout

const SearchResults = () => {
  const { query } = useParams();
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchSearch = async () => {
      if (!query) return;
      const res = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US&query=${encodeURIComponent(
          query
        )}`
      );
      const data = await res.json();
      setResults(data.results || []);
    };

    fetchSearch();
  }, [query]);

  return (
    <div className="movie__list">
      <h2 className="list__title">
        SEARCH: <span style={{ opacity: 0.9 }}>{query}</span>
      </h2>

      <div className="list__cards">
        {results.length === 0 && (
          <p style={{ opacity: 0.8 }}>No movies found for this query.</p>
        )}
        {results.map((movie) => (
          <Card key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
