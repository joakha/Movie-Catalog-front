import { useEffect, useState } from "react"
import DirectorCard from "./DirectorCard";
import './css/tab.css'

const DirectorTab = () => {

    const [directors, setDirectors] = useState([]);
    const [loading, setLoading] = useState([true]);

    //haetaan ohjaajien tiedot spring data rest apista
    const fetchDirectors = () => {

        fetch('http://localhost:8080/api/directors')

            .then(response => {

                if (!response.ok) {

                    throw new Error("Error fetching data " + response.statusText);

                }

                return response.json();

            })
            .then(responseData => {
                
                setDirectors(responseData._embedded.directors);

            })
            .catch(err => console.log(err))
            .finally(() => setLoading(false));

    };

    useEffect(() => fetchDirectors(), [])

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