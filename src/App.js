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

const apiUrl = "https://marvel-ctwlkch0.b4a.run"

function App() {
  const [userToken, setUserToken] = useState(Cookies.get("token") || null);
  const [userId, setuserId] = useState(Cookies.get("userId") || null);

  const [isLoading, setLoading] = useState(true);

  const [comics, setComics] = useState();
  const [comicSearch, setComicSearch] = useState("");
  const [comicFavoris, setComicFavoris] = useState([]);
  const [comicFavoriSearch, setComicFavoriSearch] = useState("");

  const [characterSearch, setCharacterSearch] = useState("");
  const [characterFavoris, setCharacterFavoris] = useState([]);
  const [characterFavoriSearch, setCharacterFavoriSearch] = useState("");

  const [isComicFavori, setIsComicFavori] = useState(true);

  const [page, setPage] = useState(1);
  const [skip, setSkip] = useState(0);

  const [message, setMessage] = useState("");
  
  useEffect(() => {
    try {
      const fetchData = async () => {
        const response = await axios.get(`${apiUrl}/comics?title=${comicSearch}&skip=${skip}`);
        setComics(response.data);

        if (userId) {
          const responseComicFavoris = await axios.get(`${apiUrl}/comics/favoris/${userId}`);
          setComicFavoris(responseComicFavoris.data);
        }

        setLoading(false);
      };
      fetchData();
    } catch (error) {
      console.log(error.response);
    }
  }, [comicSearch, skip, userId]);

  const setUser = (token, id) => {
    if (token !== null) {
      Cookies.set("token", token);
      Cookies.set("userId", id);
    } else {
      Cookies.remove("token");
      Cookies.remove("userId");
    }
    setUserToken(token);
    setuserId(id);
  };

  return (
    <div className="App">
      <Router>
        <Header
          setComicSearch={setComicSearch}
          setCharacterSearch={setCharacterSearch}
          userToken={userToken}
          setUserToken={setUserToken}
          setUser={setUser}
          isComicFavori={isComicFavori}
          setIsComicFavori={setIsComicFavori}
          setComicFavoriSearch={setComicFavoriSearch}
          setCharacterFavoriSearch={setCharacterFavoriSearch}
        />
        <Routes>
          <Route
            path="/"
            element={
              <Characters
                characterSearch={characterSearch}
                characterFavoris={characterFavoris}
                setCharacterFavoris={setCharacterFavoris}
                userId={userId}
                userToken={userToken}
                apiUrl={apiUrl}
              />
            }
          />

          <Route
            path="/comics/:characterId"
            element={<Character apiUrl={apiUrl} />} />
          <Route
            path="/comics"
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
                userId={userId}
                userToken={userToken}
                apiUrl={apiUrl}
              />
            }
          />
          <Route
            path="/signup"
            element={
              <Signup
                userToken={userToken}
                setUserToken={setUserToken}
                setUser={setUser}
                setMessage={setMessage}
                message={message}
                apiUrl={apiUrl}/>
              }
          />
          <Route
            path="/login"
            element={
              <Login
                userToken={userToken}
                setUserToken={setUserToken}
                setUser={setUser}
                setMessage={setMessage}
                message={message}
                apiUrl={apiUrl}/>
              }
          />
          <Route
            path="/favoris"
            element={
              <Favoris
                comicFavoris={comicFavoris}
                setComicFavoris={setComicFavoris}
                characterFavoris={characterFavoris}
                setCharacterFavoris={setCharacterFavoris}
                userId={userId}
                isComicFavori={isComicFavori}
                setIsComicFavori={setIsComicFavori}
                comicFavoriSearch={comicFavoriSearch}
                characterFavoriSearch={characterFavoriSearch}
                apiUrl={apiUrl}
              />
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
