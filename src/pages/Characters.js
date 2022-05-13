import "../pages/style/characters.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "../components/Pagination";

const Characters = ({ characterSearch }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [characters, setCharacters] = useState();
  const [skip, setSkip] = useState(0);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`http://localhost:4000/characters?name=${characterSearch}&skip=${skip}`);
      // console.log(response.data);
      setCharacters(response.data);
      setIsLoading(false);
    };

    fetchData();
  }, [characterSearch, skip]);

  return (
    <section className="characters">
      characters
      {isLoading ? (
        <p>Loading ...</p>
      ) : (
        <>
          <Pagination page={page} setPage={setPage} skip={skip} setSkip={setSkip} count={characters.count} limit={characters.limit} />
          <div className="container" COMICS>
            {characters.results.map((character) => {
              // console.log(character);
              // console.log(character._id);
              return (
                <Link to={`/comics/${character._id}`} key={character._id}>
                  <div className="img-container">
                    <img src={character.thumbnail.path + "." + character.thumbnail.extension} alt="" />

                    <div>
                      <h3>{character.name}</h3>
                      <i className="fa-solid fa-heart"></i>
                      <p>{character.description}</p>
                    </div>
                  </div>
                </Link>
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
