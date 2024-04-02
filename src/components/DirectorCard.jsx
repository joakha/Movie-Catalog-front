import './css/infocard.css'

const DirectorCard = (props) => {

    return (

        <div className='card'>

        <h2 className='card-title'>{props.content.name}</h2>

        </div>

    )

}

export default DirectorCard