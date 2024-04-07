import { useEffect, useState } from "react"
import ReviewCard from "./ReviewCard";
import './css/tab.css'

const ReviewTab = () => {

  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState([true]);

  useEffect(() => {

    const fetchReviews = async () => {

      try {

        const response = await fetch("http://localhost:8080/api/reviews");

        const data = await response.json();

        setReviews(data);

      }

      catch (error) {

        console.error(error);

      }

    }

    fetchReviews();

  }, [])

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