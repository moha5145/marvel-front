import "../pages/style/characters.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Characters = ({ characterSearch }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [characters, setCharacters] = useState();
  const [skip, setSkip] = useState(100);
  const fetchData = async () => {
    const response = await axios.get(`http://localhost:4000/characters?name=${characterSearch}&skip${skip}`);
    // console.log(response.data);
    setCharacters(response.data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [characterSearch]);

  return (
    <section className="characters">
      characters
      {isLoading ? (
        <p>Loading ...</p>
      ) : (
        <div className="container">
          {characters.results.map((character) => {
            // console.log(character);
            // console.log(character._id);
            return (
              <Link to={`/comics/${character._id}`} key={character._id}>
                <div className="img-container">
                  <img src={character.thumbnail.path + "." + character.thumbnail.extension} alt="" />

                  <div>
                    <h3>{character.name}</h3>
                    <p>{character.description}</p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default Characters;
