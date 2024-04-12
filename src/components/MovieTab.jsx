import { useEffect, useState, useRef } from "react"
import MovieCard from "./MovieCard";
import './css/tab.css'

const MovieTab = () => {

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState([true]);

  const searchDropdownRef = useRef(null);

  useEffect(() => {

    const fetchMovies = async () => {

      try {

        const response = await fetch("http://localhost:8080/api/movies");

        const data = await response.json();

        setMovies(data);

      }

      catch (error) {

        console.error(error);

      }

    }

    fetchMovies();

  }, [])

  const sortMovies = (event) => {

    const toBeSortedMovies = [...movies];

    switch (event.target.value) {

      case "A-Z":
        setMovies(toBeSortedMovies.sort((a, b) => a.title.localeCompare(b.title)));
        break;

      case "Z-A":
        setMovies(toBeSortedMovies.sort((a, b) => b.title.localeCompare(a.title)));
        break;

      case "Longest":
        setMovies(toBeSortedMovies.sort((a, b) => b.length - a.length));
        break;

      case "Shortest":
        setMovies(toBeSortedMovies.sort((a, b) => a.length - b.length));
        break;

      case "Most recent":
        setMovies(toBeSortedMovies.sort((a, b) => b.releaseYear - a.releaseYear));
        break;

      case "Most old":
        setMovies(toBeSortedMovies.sort((a, b) => a.releaseYear - b.releaseYear));
        break;

    }

  }

  const fetchMoviesBy = async (option, keyword) => {

    try {

      const response = await fetch(`http://localhost:8080/api/movies/findBy${option}/${keyword}`);

      const data = await response.json();

      setMovies(data);

    }

    catch (error) {

      console.error(error);

    }

  }

  const searchForMovies = async (event) => {

    const option = searchDropdownRef.current.value;

    const keyword = event.target.value;

    if (keyword.trim() !== "") {

      fetchMoviesBy(option, keyword);

    }

    else {

      try {

        const response = await fetch("http://localhost:8080/api/movies");

        const data = await response.json();

        setMovies(data);

      }

      catch (error) {

        console.error(error);

      }

    }

  }

  return (

    <>

      <h1>Movies I have Watched</h1>

      <div>

        <select onChange={sortMovies} defaultValue={"A-Z"}>

          <option value="A-Z">A-Z</option>
          <option value="Z-A">Z-A</option>
          <option value="Longest">Longest</option>
          <option value="Shortest">Shortest</option>
          <option value="Most recent">Most recent</option>
          <option value="Most old">Most old</option>

        </select>

      </div>

      <div>

        <label htmlFor="searchDropdown">Search by:
          <select id="searchDropdown" ref={searchDropdownRef} defaultValue={"genre"}>

            <option value="Genre">Genre</option>
            <option value="Title">Title</option>

          </select>
        </label>

        <input type="text" onChange={searchForMovies} />

      </div>

      <div className="contentContainer">

        {

          movies.map((movie, index) =>

            <MovieCard key={index} content={movie} />

          )}

      </div>

    </>

  )

}

export default MovieTab