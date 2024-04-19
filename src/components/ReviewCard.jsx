import './css/infocard.css'

const ReviewCard = (props) => {

    return (

        <div className='card'>

            <h2 className='card-title'>{props.content.movie.title}</h2>

            <p><span>Score:</span> {props.content.score}</p>
            <p><span>Comment:</span> {props.content.comment}</p>

        </div>

    )

}

export default ReviewCard