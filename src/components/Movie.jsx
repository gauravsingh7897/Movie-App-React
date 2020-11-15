import React, { useEffect, useState } from "react";
import "./Movie.css";

function Movie(data) {
  const [rating, setRating] = useState("");
  const [plot, setPlot] = useState("");
  const MOVIE_API = `http://www.omdbapi.com/?apikey=<<YOUR_API_KEY>>&t=${data.data.Title}`;

  useEffect(() => {
    async function fetchMovie() {
      const moviesResponse = await fetch(MOVIE_API);
      const movieR = await moviesResponse.json();
      setRating(movieR.imdbRating);
      setPlot(movieR.Plot);
    }
    fetchMovie();
  }, []);

  return (
    <div className="movie">
      <div className="movie-plot">
        <h2>Overview:</h2>
        <p>{plot}</p>
      </div>
      <img src={data.data.Poster} alt="No Image"></img>
      <h2>{data.data.Title}</h2>
      <h4>{data.data.Year}</h4>
      <h4>Rating : {rating}</h4>
    </div>
  );
}

export default Movie;
