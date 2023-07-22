import React,{useState} from "react";
import './App.css';
import Navbar from './Components/Navbar';
import Section from './Components/Section';

function App() {
  const [search, setSearch] = useState("");
  const [clicked, setClicked] = useState(false);

  return (

    <div >
      <Navbar search={search} setSearch={setSearch} setClicked={setClicked}/>
      <Section title={search} clicked={clicked} setClicked={setClicked} />
    </div>
  );
}

export default App;
