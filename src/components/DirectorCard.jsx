import './css/infocard.css'

const DirectorCard = (props) => {

    return (

        <div className='card'>

            <h2 className='card-title'>{props.content.name}</h2>

            <p>Movies:</p>

            {props.content.movies.map((movie, index) => {

                return (

                    <p key={index}>{movie.title}</p>

                )

            })}

        </div>

    )

}

export default DirectorCard