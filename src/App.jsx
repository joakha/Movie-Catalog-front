import './App.css'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import MovieTab from "./components/MovieTab"
import DirectorTab from './components/DirectorTab'
import ReviewTab from './components/ReviewTab'
import Home from './components/Home'
import { useState } from 'react';

function App() {

  const [tab, setValue] = useState("1");

  const changeTab = (event, newValue) => {

    setValue(newValue);

  };

  return (
    <>

      <Tabs style={{ marginBottom: "30px" }} value={tab} onChange={changeTab} centered>
        <Tab label="Home" value="1" />
        <Tab label="Movies" value="2" />
        <Tab label="Directors" value="3" />
        <Tab label="Reviews" value="4" />
      </Tabs>

      {tab === "1" && <Home />}
      {tab === "2" && <MovieTab />}
      {tab === "3" && <DirectorTab />}
      {tab === "4" && <ReviewTab />}

    </>
  )
}

export default App
