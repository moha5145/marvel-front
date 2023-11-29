import "../pages/style/characters.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Pagination from "../components/Pagination";

import { BallTriangle } from "react-loader-spinner";

const Characters = ({ characterSearch, characterFavoris, setCharacterFavoris, userId, userToken, apiUrl }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [characters, setCharacters] = useState();
  const [skip, setSkip] = useState(0);
  const [page, setPage] = useState(1);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/characters?name=${characterSearch}&skip=${skip}`);

        setCharacters(response.data);

        if (userId) {
          const responseCharacterFavoris = await axios.get(`${apiUrl}/character/favoris/${userId}`);

          setCharacterFavoris(responseCharacterFavoris.data);
        }

        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };

    fetchData();
  }, [characterSearch, skip, setCharacterFavoris, userId, userToken, apiUrl]);

  const addFavoris = async (character) => {
    try {
      if (userToken) {
        const favoriToPush = {
          name: character.name,
          description: character.description,
          comics: character.comics,
          thumbnail: character.thumbnail,
          characterId: character._id,
          userId: userId,
        };
        const newFavoris = [...characterFavoris];
        newFavoris.push(favoriToPush);
        setCharacterFavoris(newFavoris);

        const response = await axios.post(`${apiUrl}/caractair/favoris/create`, favoriToPush);
        console.log(response.data);
      } else {
        navigate("/login");
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  const removeFavoris = async (character) => {
    try {
      const ids = { _id: character._id, userId: userId };
      const result = characterFavoris.filter((fav) => fav.characterId !== character._id);
      setCharacterFavoris(result);

      const response = await axios.post(`${apiUrl}/character/favoris/delete`, ids);
      console.log(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <section className="characters">
      characters
      {isLoading ? (
        <div className="spiner ">
          <BallTriangle heigth="100" width="100" color="#ee171f" ariaLabel="loading-indicator" />
        </div>
      ) : (
        <>
          <Pagination page={page} setPage={setPage} skip={skip} setSkip={setSkip} count={characters.count} limit={characters.limit} />
          <div className="container">
            {characters.results.map((character) => {
              let like = characterFavoris.find((fav) => fav.characterId === character._id);
              return (
                <div
                  key={character._id}
                  className="img-container"
                  onClick={(event) => {
                    navigate(`/comics/${character._id}`);
                  }}
                >
                  <img src={character.thumbnail.path + "." + character.thumbnail.extension} alt="" />

                  <div>
                    {!like && (
                      <i
                        className="fa-solid fa-heart white"
                        onClick={(event) => {
                          event.stopPropagation();

                          addFavoris(character);
                        }}
                      ></i>
                    )}

                    {like && (
                      <i
                        className="fa-solid fa-heart red"
                        onClick={(event) => {
                          event.stopPropagation();

                          removeFavoris(character);
                        }}
                      ></i>
                    )}
                  </div>

                  <div>
                    <h3>{character.name}</h3>
                    <p>{character.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <Pagination page={page} setPage={setPage} skip={skip} setSkip={setSkip} count={characters.count} limit={characters.limit} />
        </>
      )}
    </section>
  );
};

export default Characters;
