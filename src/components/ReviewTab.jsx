import { useEffect, useState } from "react"
import ReviewCard from "./ReviewCard";
import './css/tab.css'

const ReviewTab = () => {

  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState([true]);

  //haetaan elokuvien arvostelut spring data rest apista
  const fetchReviews = () => {

    fetch('http://localhost:8080/api/reviews')

      .then(response => {

        if (!response.ok) {

          throw new Error("Error fetching data " + response.statusText);

        }

        return response.json();

      })

      .then(responseData => {

        //tässä on taulukko lupauksia
        const reviewsWithMovie = responseData._embedded.reviews.map(review => {

          return fetchReviewMovie(review);

        });

        //suoritetaan kaikki taulukon lupaukset
        Promise.all(reviewsWithMovie)
          //tämä lupaus suoritetaan kun kaikki taulukon lupaukset on suoritettu
          .then(updatedReviews => setReviews(updatedReviews))
          .catch(err => console.log(err))
          .finally(() => setLoading(false));

      })

  };

  /* tämä funktio palauttaa lupauksen, joka hakee arvostelun elokuvan tiedot spring data rest apista, 
  tallentaa ne arvostelu olioon ja palauttaa päivitetyn olion */
  const fetchReviewMovie = (review) => {

    return fetch(review._links.movie.href)

      .then(response => {

        if (!response.ok) {

          throw new Error("Error fetching movie data " + response.statusText);

        }

        return response.json();

      })

      .then(movieData => {

        review.movie = movieData;
        return review;

      })

      .catch(err => console.log(err));

  };

  useEffect(() => fetchReviews(), [])

  return (

    <>

      <h1>My Movie Reviews</h1>

      <div className="contentContainer">

        {

          reviews.map((review, index) =>

            <ReviewCard key={index} content={review} />

          )}

      </div>

    </>

  )

}

export default ReviewTab