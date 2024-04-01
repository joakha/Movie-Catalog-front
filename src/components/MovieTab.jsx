import { useEffect, useState } from "react"
import MovieCard from "./MovieCard";
import './css/movietab.css'

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

        Promise.all(moviesWithDirector)
          //tämä lupaus suoritetaan kun kaikki taulukon lupaukset on täytetty
          .then(updatedMovies => setMovies(updatedMovies))
          .catch(err => console.log(err))
          .finally(() => setLoading(false));

      })

  };

  //tämä funktio hakee jokaisen elokuvan ohjaajan tiedot spring data rest apista ja tallentaa ne jokaiseen elokuva olioon
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

  useEffect(() => fetchMovies(), [])

  return (

    <>

      <h1>Movies I have Watched</h1>

      <div className="movieContainer">

        {

          movies.map((movie, index) =>

            <MovieCard key={index} content={movie} />

          )}

      </div>

    </>

  )

}

export default MovieTab