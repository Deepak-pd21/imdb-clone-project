// src/context/WatchlistContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";

const WatchlistContext = createContext(null);

export const WatchlistProvider = ({ children }) => {
  const [watchlist, setWatchlist] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const wl = JSON.parse(localStorage.getItem("watchlist")) || [];
    const fav = JSON.parse(localStorage.getItem("favorites")) || [];
    setWatchlist(wl);
    setFavorites(fav);
  }, []);

  const addToList = (key, movie) => {
    const list = key === "watchlist" ? watchlist : favorites;
    const setList = key === "watchlist" ? setWatchlist : setFavorites;

    const exists = list.some((m) => m.id === movie.id);
    if (exists) return;

    const movieToSave = {
      id: movie.id,
      title: movie.title || movie.original_title,
      poster_path: movie.poster_path,
    };

    const updated = [...list, movieToSave];
    setList(updated);
    localStorage.setItem(key, JSON.stringify(updated));
  };

  const removeFromList = (key, movieId) => {
    const list = key === "watchlist" ? watchlist : favorites;
    const setList = key === "watchlist" ? setWatchlist : setFavorites;

    const updated = list.filter((m) => m.id !== movieId);
    setList(updated);
    localStorage.setItem(key, JSON.stringify(updated));
  };

  const value = { watchlist, favorites, addToList, removeFromList };

  return (
    <WatchlistContext.Provider value={value}>
      {children}
    </WatchlistContext.Provider>
  );
};

export const useWatchlist = () => useContext(WatchlistContext);
