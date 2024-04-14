import { useEffect, useState, useRef } from "react"
import DirectorCard from "./DirectorCard";
import './css/tab.css'
import { URL } from "./Constants";
import Picture from "./assets/Director.png";

const DirectorTab = () => {

  const [directors, setDirectors] = useState([]);
  const [loading, setLoading] = useState([true]);

  const searchDropdownRef = useRef(null);

  useEffect(() => {

    const fetchDirectors = async () => {

      try {

        const response = await fetch(URL + "/api/directors");

        const data = await response.json();

        setDirectors(data);

        setLoading(false);

      }

      catch (error) {

        console.error(error);

      }

    }

    fetchDirectors();

  }, [])

  const sortDirectors = (event) => {

    const toBeSortedDirectors = [...directors];

    switch (event.target.value) {

      case "A-Z":
        setDirectors(toBeSortedDirectors.sort((a, b) => a.name.localeCompare(b.name)));
        break;

      case "Z-A":
        setDirectors(toBeSortedDirectors.sort((a, b) => b.name.localeCompare(a.name)));
        break;

    }

  }

  const fetchDirectorsBy = async (option, keyword) => {

    try {

      const response = await fetch(URL + `/api/directors/findBy${option}/${keyword}`);

      const data = await response.json();

      setDirectors(data);

      setLoading(false);

    }

    catch (error) {

      console.error(error);

    }

  }

  const searchForDirectors = async (event) => {

    setLoading(true);

    const option = searchDropdownRef.current.value;

    const keyword = event.target.value;

    if (keyword.trim() !== "") {

      fetchDirectorsBy(option, keyword);

    }

    else {

      try {

        const response = await fetch(URL + "/api/directors");

        const data = await response.json();

        setDirectors(data);

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

        <h1>Movie Directors</h1>

        <img src={Picture}/>

      </header>

      <div className="searchBar">

        <div>

          <label htmlFor="sortDropdown">Sort by:</label>

          <select id="sortDropdown" onChange={sortDirectors} defaultValue={"A-Z"}>

            <option value="A-Z">A-Z</option>
            <option value="Z-A">Z-A</option>

          </select>

        </div>

        <div>

          <label htmlFor="searchDropdown">Search by:</label>

          <select id="searchDropdown" ref={searchDropdownRef}>

            <option value="Name">Name</option>

          </select>

          <input type="text" placeholder="Search directors..." onChange={searchForDirectors} />

        </div>

      </div>

      {loading ? <p className="infoParagraph">Loading Directors...</p> :

        <div className="contentContainer">

          {directors.map((director, index) =>

            <DirectorCard key={index} content={director} />

          )}

        </div>

      }

    </>

  )

}

export default DirectorTab