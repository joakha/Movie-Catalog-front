import './css/tab.css'
import Picture from "./assets/Frontpage.jpg";

const Home = () => {

  return (

    <>

      <header>

        <h1>Welcome to my movie catalog!</h1>

        <img src={Picture}/>

      </header>

      <div className='welcomeBox'>

        <p className='infoParagraph'>Here you can view the movies I have watched,
          see directors who directed them as well as look at the reviews I've given to the movies.</p>

        <p className='infoParagraph'>You can also filter and search the information by different criteria.</p>

        <p className='infoParagraph'>Have fun!</p>

      </div>

    </>

  )

}

export default Home