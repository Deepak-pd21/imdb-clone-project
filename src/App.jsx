import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import MovieList from "./components/MovieList/MovieList";
import MovieDetail from "./pages/MovieDetail/MovieDetail";
import Footer from "./components/Footer/Footer";
import SearchResults from "./pages/Search/Search";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route index element={<Home />} />
        <Route path="/movie/:id" element={<MovieDetail />} />
        <Route path="/movies/:type" element={<MovieList />} />
        <Route path="/search/:query" element={<SearchResults />} />
        <Route path="/*" element={<h1>Error 404!!!</h1>} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
