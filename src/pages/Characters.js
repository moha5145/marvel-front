import "../pages/style/characters.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Pagination from "../components/Pagination";

const Characters = ({ characterSearch }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [characters, setCharacters] = useState();
  const [skip, setSkip] = useState(0);
  const [page, setPage] = useState(1);
  const [characterFavoris, setCharacterFavoris] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const response = await axios.get(`http://localhost:4000/characters?name=${characterSearch}&skip=${skip}`);
        const response = await axios.get(`https://marvel-back-moha.herokuapp.com/characters?name=${characterSearch}&skip=${skip}`);

        setCharacters(response.data);

        const responseCharacterFavoris = await axios.get("http://localhost:4000/character/favoris/get");
        setCharacterFavoris(responseCharacterFavoris.data);

        setIsLoading(false);
        console.log(responseCharacterFavoris.data);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  }, [characterSearch, skip]);

  const addFavoris = async (character) => {
    try {
      const newFavoris = [...characterFavoris];
      newFavoris.push(newFavoris);
      setCharacterFavoris(newFavoris);

      console.log("chara=>", character);
      const response = await axios.post("http://localhost:4000/caractair/favoris/post", character);
      console.log(response);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <section className="characters">
      characters
      {isLoading ? (
        <p>Loading ...</p>
      ) : (
        <>
          <Pagination page={page} setPage={setPage} skip={skip} setSkip={setSkip} count={characters.count} limit={characters.limit} />
          <div className="container">
            {characters.results.map((character) => {
              return (
                // <Link to={`/comics/${character._id}`} key={character._id}>
                <div
                  className="img-container"
                  onClick={() => {
                    navigate(`/comics/${character._id}`);
                  }}
                >
                  <img src={character.thumbnail.path + "." + character.thumbnail.extension} alt="" />

                  <div>
                    {!characterFavoris.find((fav) => fav._id === character._id) && (
                      <i
                        className="fa-solid fa-heart white"
                        onClick={(event) => {
                          event.stopPropagation();

                          addFavoris(character);
                        }}
                      ></i>
                    )}

                    {characterFavoris.find((fav) => fav._id === character._id) && (
                      <i
                        className="fa-solid fa-heart red"
                        onClick={(event) => {
                          event.stopPropagation();
                          const result = characterFavoris.filter((fav) => fav._id !== character._id);
                          setCharacterFavoris(result);
                        }}
                      ></i>
                    )}
                  </div>
                  {/* ) : (
                    <i
                      className="fa-solid fa-heart white"
                      onClick={(event) => {
                        addFavoris(event, character);
                      }}
                    ></i>
                  )} */}

                  <div>
                    <h3>{character.name}</h3>
                    <p>{character.description}</p>
                  </div>
                </div>
                // </Link>
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
