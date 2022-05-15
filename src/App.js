import "./reset.css";
import "./App.scss";

import Header from "./components/Header";
import Comics from "./pages/Comics";
import Characters from "./pages/Characters";
import Character from "./pages/Character";
import Cookies from "js-cookie";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Favoris from "./pages/Favoris";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import axios from "axios";

function App() {
  const [comicSearch, setComicSearch] = useState("");
  const [characterSearch, setCharacterSearch] = useState("");
  const [userToken, setUserToken] = useState(Cookies.get("token") || null);

  // const [isLoadingFav, setIsLodingFav] = useState(true);
  const [comics, setComics] = useState();
  const [isLoading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [skip, setSkip] = useState(0);
  const [comicFavoris, setComicFavoris] = useState();

  useEffect(() => {
    const fetchData = async () => {
      // const response = await axios.get(`http://localhost:4000/comics?title=${comicSearch}&skip=${skip}`);
      const response = await axios.get(`https://marvel-back-moha.herokuapp.com/comics?title=${comicSearch}&skip=${skip}`);
      setComics(response.data);

      const responseComicFavoris = await axios.get("http://localhost:4000/comics/favoris/get");
      setComicFavoris(responseComicFavoris.data);

      console.log(responseComicFavoris.data);

      setLoading(false);
    };
    fetchData();
  }, [comicSearch, skip]);

  return (
    <div className="App">
      <Router>
        <Header setComicSearch={setComicSearch} setCharacterSearch={setCharacterSearch} userToken={userToken} setUserToken={setUserToken} />
        <Routes>
          <Route
            path="/"
            element={
              <Comics
                comicSearch={comicSearch}
                comicFavoris={comicFavoris}
                setComicFavoris={setComicFavoris}
                comics={comics}
                setComics={setComics}
                page={page}
                skip={skip}
                setPage={setPage}
                setSkip={setSkip}
                isLoading={isLoading}
              />
            }
          />

          <Route path="/comics/:characterId" element={<Character />} />
          <Route path="/characters" element={<Characters characterSearch={characterSearch} />} />
          <Route path="/signup" element={<Signup userToken={userToken} setUserToken={setUserToken} />} />
          <Route path="/login" element={<Login userToken={userToken} setUserToken={setUserToken} />} />
          <Route path="/favoris" element={<Favoris comicFavoris={comicFavoris} setComicFavoris={setComicFavoris} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
