import { useEffect, useState } from "react"
import MovieCard from "./MovieCard";
import './css/tab.css'

const MovieTab = () => {

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState([true]);

  //haetaan elokuvien tiedot spring data rest apista
  const fetchMovies = () => {

    fetch('http://localhost:8080/api/movies')

      .then(response => {

        if (!response.ok) {

          throw new Error("Error fetching data " + response.statusText);

        }

        return response.json();

      })

      .then(responseData => {

        //tässä on taulukko lupauksia
        const moviesWithDirector = responseData._embedded.movies.map(movie => {

          return fetchMovieDirector(movie);

        });

        //suoritetaan kaikki taulukon lupaukset
        Promise.all(moviesWithDirector)
          //tämä lupaus suoritetaan kun kaikki taulukon lupaukset on suoritettu
          .then(updatedMovies => setMovies(updatedMovies))
          .catch(err => console.log(err))
          .finally(() => setLoading(false));

      })

  };

  /* tämä funktio palauttaa lupauksen, joka hakee elokuvan ohjaajan tiedot spring data rest apista, 
  tallentaa ne elokuva olioon ja palauttaa päivitetyn olion */
  const fetchMovieDirector = (movie) => {

    return fetch(movie._links.director.href)

      .then(response => {

        if (!response.ok) {

          throw new Error("Error fetching director data " + response.statusText);

        }

        return response.json();

      })

      .then(directorData => {

        movie.director = directorData;
        return movie;

      })

      .catch(err => console.log(err));

  };

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

  useEffect(() => fetchMovies(), [])

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