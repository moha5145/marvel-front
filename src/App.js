import "./reset.css";
import "./App.scss";

import Header from "./components/Header";
import Comics from "./pages/Comics";
import Characters from "./pages/Characters";
import Character from "./pages/Character";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";

function App() {
  const [comicSearch, setComicSearch] = useState("");
  const [characterSearch, setCharacterSearch] = useState("");
  // console.log(characterSearch);
  return (
    <div className="App">
      <Router>
        <Header setComicSearch={setComicSearch} setCharacterSearch={setCharacterSearch} />

        <Routes>
          <Route path="/" element={<Comics comicSearch={comicSearch} />} />
          <Route path="/comics/:characterId" element={<Character />} />
          <Route path="/characters" element={<Characters characterSearch={characterSearch} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
