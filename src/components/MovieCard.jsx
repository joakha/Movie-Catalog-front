import './css/infocard.css'

const MovieCard = (props) => {

    return (

        <div className='card'>

            <h2 className='card-title'>{props.content.title}</h2>

            <p>{props.content.releaseYear}</p>
            <p>{props.content.genre}</p>
            <p>{props.content.director.name}</p>
            <p className='card-text'>{props.content.length}</p>

        </div>

    )

}

export default MovieCard