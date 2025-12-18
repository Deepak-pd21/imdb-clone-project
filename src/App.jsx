import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import MovieList from "./components/MovieList/MovieList";
import MovieDetail from "./pages/MovieDetail/MovieDetail";
import Footer from "./components/Footer/Footer";
import SearchResults from "./pages/Search/Search";
import Watchlist from "./pages/Watchlist";
import Favorites from "./pages/Favorites";

function App() {
  return (
    <div className="App min-h-screen w-full bg-black">
      <Header />
      <Routes>
        <Route index element={<Home />} />
        <Route path="/movie/:id" element={<MovieDetail />} />
        <Route path="/movies/:type" element={<MovieList />} />
        <Route path="/search/:query" element={<SearchResults />} />
        <Route path="/watchlist" element={<Watchlist />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/*" element={<h1 className="text-white">Error 404!!!</h1>} />
      </Routes>
      <Footer />
    </div>
  );
}


export default App;
