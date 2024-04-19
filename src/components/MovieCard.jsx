import './css/infocard.css'

const MovieCard = (props) => {

    return (

        <div className='card'>

            <h2 className='card-title'>{props.content.title}</h2>

            <p><span>Released:</span> {props.content.releaseYear}</p>
            <p><span>Genre:</span> {props.content.genre}</p>
            <p><span>Directed by:</span> {props.content.director.name}</p>
            <p><span>Length:</span> {props.content.length} minutes</p>

        </div>

    )

}

export default MovieCard