import { useEffect, useState } from "react"
import DirectorCard from "./DirectorCard";
import './css/tab.css'

const DirectorTab = () => {

  const [directors, setDirectors] = useState([]);
  const [loading, setLoading] = useState([true]);

  useEffect(() => {

    const fetchDirectors = async () => {

      try {

        const response = await fetch("http://localhost:8080/api/directors");

        const data = await response.json();

        setDirectors(data);

      }

      catch (error) {

        console.error(error);

      }

    }

    fetchDirectors();

  }, [])

  return (

    <>

      <h1>Movie Directors</h1>

      <div className="contentContainer">

        {

          directors.map((director, index) =>

            <DirectorCard key={index} content={director} />

          )}

      </div>

    </>

  )

}

export default DirectorTab