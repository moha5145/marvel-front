import "./reset.css";
import "./App.scss";
import axios from "axios";
import Header from "./components/Header";
import Home from "./pages/Home";
import Characters from "./pages/Characters";
import Character from "./pages/Character";
import Comic from "./pages/Comic";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

function App() {
  const [comics, setComics] = useState({});
  const [isLoading, setLoading] = useState(true);

  const fetchData = async () => {
    const response = await axios.get("http://localhost:4000/comics");
    setComics(response.data);
    setLoading(false);
    // console.log(response.data);
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="App">
      <Router>
        <Header />

        <Routes>
          <Route path="/" element={<Home comics={comics} isLoading={isLoading} />} />
          <Route path="/comics/:characterId" element={<Comic isLoading={isLoading} setLoading={setLoading} />} />

          <Route path="/characters" element={<Characters />} />
          <Route path="/character/" element={<Character />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
