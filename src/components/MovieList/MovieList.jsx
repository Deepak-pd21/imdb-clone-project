import React, { useEffect, useState } from "react";
import Card from "../Card/Card";
import { useParams } from "react-router-dom";
import "./MovieList.css";

const MovieList = ({ query = "" }) => {

    const [movieList, setMovieList] = useState([]);
    const { type } = useParams();

    const getData = () => {
        fetch(`https://api.themoviedb.org/3/movie/${type ? type : "popular"}?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`)
            .then(response => response.json())
            .then(data => setMovieList(data.results));
    }

    useEffect(() => {
        getData();
        }, [type])

    useEffect(() => {
        getData();
    }, [type]);

      const prettyTitle = (rawType) => {
    if (!rawType) return "POPULAR";
    if (rawType === "top_rated") return "TOP RATED";
    return rawType.replace("_", " ").toUpperCase();
  };
  const filtered = movieList.filter((m) =>
  m.original_title?.toLowerCase().includes(query.toLowerCase())
);


    return (
        <div className="movie__list">
            <h2 className="list__title">{prettyTitle(type)}</h2>
            <div className="list__cards">
                {
                    filtered.map((movie) => (
    <Card key={movie.id} movie={movie} />
                    ))
                }
            </div>
        </div>
    );
}

export default MovieList;
