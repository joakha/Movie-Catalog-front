import './css/infocard.css'

const ReviewCard = (props) => {

    return (

        <div className='card'>

            <h2 className='card-title'>{props.content.movie.title}</h2>

            <p>{props.content.score}</p>
            <p>{props.content.comment}</p>

        </div>

    )

}

export default ReviewCard