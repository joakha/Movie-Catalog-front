import { useEffect, useState, useRef } from "react"
import MovieCard from "./MovieCard";
import './css/tab.css'
import { URL } from "./Constants";
import Picture from "./assets/Popcorn.jpg";
import { Button } from '@mui/material';

const MovieTab = () => {

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState([true]);
  const [searching, setSearching] = useState(false);

  const searchDropdownRef = useRef(null);
  const inputFieldRef = useRef(null);

  useEffect(() => {

    const fetchMovies = async () => {

      try {

        const response = await fetch(URL + "/api/movies");
        const data = await response.json();
        setMovies(data);
        setLoading(false);

      }

      catch (error) {

        console.error(error);

      }

    }

    fetchMovies();

  }, [])

  const undoSearch = async () => {

    try {

      setSearching(false);
      const response = await fetch(URL + "/api/movies");
      const data = await response.json();
      setMovies(data);
      setLoading(false);

    }

    catch (error) {

      console.error(error);

    }

  }

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

      const response = await fetch(URL + `/api/movies/findBy${option}/${keyword}`);
      const data = await response.json();
      setMovies(data);
      setLoading(false);

    }

    catch (error) {

      console.error(error);

    }

  }

  const searchForMovies = async () => {

    setLoading(true);
    setSearching(true);
    const option = searchDropdownRef.current.value;
    const keyword = inputFieldRef.current.value;

    if (keyword.trim() !== "") {

      fetchMoviesBy(option, keyword);

    }

    else {

      try {

        setSearching(false);
        const response = await fetch(URL + "/api/movies");
        const data = await response.json();
        setMovies(data);
        setLoading(false);

      }

      catch (error) {

        console.error(error);

      }

    }

  }

  return (

    <>

      <header>

        <h1>Movies I have Watched</h1>
        <img src={Picture} />

      </header>

      <div className="searchBar">

        <div>

          <label htmlFor="sortDropdown">Sort by:</label>
          <select id="sortDropdown" onChange={sortMovies} defaultValue={"A-Z"}>

            <option value="A-Z">A-Z</option>
            <option value="Z-A">Z-A</option>
            <option value="Longest">Longest</option>
            <option value="Shortest">Shortest</option>
            <option value="Most recent">Most recent</option>
            <option value="Most old">Most old</option>

          </select>

        </div>

        <div>

          <label htmlFor="searchDropdown">Search by:</label>
          <select id="searchDropdown" ref={searchDropdownRef} defaultValue={"genre"}>

            <option value="Genre">Genre</option>
            <option value="Title">Title</option>

          </select>

          <input type="text" placeholder="Enter keyword" ref={inputFieldRef} />
          <Button sx={{ marginLeft: 1, marginBottom: 1 }} variant="contained" onClick={searchForMovies}>Search</Button>

        </div>

        {searching &&

          <div className="undo">
            <span>Searching with a keyword</span>
            <Button sx={{ marginLeft: 1, marginBottom: 1 }} variant="contained" onClick={undoSearch}>Undo</Button>
          </div>
        }

      </div>

      {loading ? <p className="infoParagraph">Loading Movies...</p> :

        <div className="contentContainer">

          {movies.map((movie, index) =>

            <MovieCard key={index} content={movie} />

          )}

        </div>

      }

    </>

  )

}

export default MovieTab