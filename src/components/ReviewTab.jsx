import { useEffect, useState, useRef } from "react"
import ReviewCard from "./ReviewCard";
import './css/tab.css'
import { URL } from "./Constants";
import Picture from "./assets/Review.jpg";

const ReviewTab = () => {

  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState([true]);

  const searchDropdownRef = useRef(null);

  useEffect(() => {

    const fetchReviews = async () => {

      try {

        const response = await fetch(URL + "/api/reviews");

        const data = await response.json();

        setReviews(data);

        setLoading(false);

      }

      catch (error) {

        console.error(error);

      }

    }

    fetchReviews();

  }, [])

  const sortReviews = (event) => {

    const toBeSortedReviews = [...reviews];

    switch (event.target.value) {

      case "Highest Score":
        setReviews(toBeSortedReviews.sort((a, b) => b.score - a.score));
        break;

      case "Lowest Score":
        setReviews(toBeSortedReviews.sort((a, b) => a.score - b.score));
        break;

    }

  }

  const fetchReviewsBy = async (option, keyword) => {

    try {

      const response = await fetch(URL + `/api/reviews/findBy${option}/${keyword}`);

      const data = await response.json();

      setReviews(data);

      setLoading(false);

    }

    catch (error) {

      console.error(error);

    }

  }

  const searchForReviews = async (event) => {

    setLoading(true);

    const option = searchDropdownRef.current.value;

    const keyword = event.target.value;

    if (keyword.trim() !== "") {

      fetchReviewsBy(option, keyword);

    }

    else {

      try {

        const response = await fetch(URL + "/api/reviews");

        const data = await response.json();

        setReviews(data);

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

        <h1>My Movie Reviews</h1>

        <img src={Picture} />

      </header>

      <div className="searchBar">

        <div>

          <label htmlFor="sortDropdown">Sort by:</label>

          <select id="sortDropdown" onChange={sortReviews} defaultValue={"Highest Score"}>

            <option value="Highest Score">Highest Score</option>
            <option value="Lowest Score">Lowest Score</option>

          </select>

        </div>

        <div>

          <label htmlFor="searchDropdown">Search by:</label>

          <select id="searchDropdown" ref={searchDropdownRef} defaultValue={"Score"}>

            <option value="Score">Score</option>

          </select>

          <input type="text" placeholder="Search reviews..." onChange={searchForReviews} />

        </div>

      </div>

      {loading ? <p className="infoParagraph">Loading Reviews...</p> :

        <div className="contentContainer">

          {reviews.map((review, index) =>

            <ReviewCard key={index} content={review} />

          )}

        </div>

      }

    </>

  )

}

export default ReviewTab