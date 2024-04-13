import './css/infocard.css'

const MovieCard = (props) => {

    return (

        <div className='card'>

            <h2 className='card-title'>{props.content.title}</h2>

            <p>Released: {props.content.releaseYear}</p>
            <p>Genre: {props.content.genre}</p>
            <p>Directed by: {props.content.director.name}</p>
            <p>Length: {props.content.length} minutes</p>

        </div>

    )

}

export default MovieCard