import { TextField } from "@material-ui/core";
import { useEffect, useState } from "react";
import "./App.css";
import Movie from "./components/Movie";
import Error from "./components/Error";

const SEARCH_API = "http://www.omdbapi.com/?apikey=<<YOUR_API_KEY>>&s=";

function App() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function fetchMovie() {
      const moviesResponse = await fetch(SEARCH_API + "avengers");
      const movieR = await moviesResponse.json();
      setMovies(movieR.Search);
    }
    fetchMovie();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    async function fetchMovie() {
      const moviesResponse = await fetch(`${SEARCH_API}${search}`);
      const movieR = await moviesResponse.json();
      if (!movieR.Error) {
        setMovies(movieR.Search);
      } else {
        setMovies([]);
      }
    }
    fetchMovie();
    setSearch("");
  };

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <>
      <header>
        <form onSubmit={handleSubmit}>
          <input
            className="searchMovie"
            type="search"
            placeholder="Search"
            onChange={handleChange}
            value={search}
          />
        </form>
      </header>
      <div className="app">
        {(movies.length > 0 &&
          movies.map((movie) => <Movie key={movie.imdbID} data={movie} />)) || (
          <Error />
        )}
      </div>
    </>
  );
}

export default App;
