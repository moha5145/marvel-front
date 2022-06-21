import axios from "axios";
import { useEffect, useState } from "react";
import "./style/favoris.scss";
const Favoris = ({ comicFavoris, setComicFavoris, characterFavoris, setCharacterFavoris }) => {
  const [isComicFavOrCharcFav, setIsComicFavOrCharcFav] = useState("comic");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://marvel-back-moha.herokuapp.com/character/favoris/get");
        setCharacterFavoris(response.data);

        const responseComicFavoris = await axios.get("https://marvel-back-moha.herokuapp.com/comics/favoris/get");
        setComicFavoris(responseComicFavoris.data);

        setIsLoading(false);
        console.log(response.data);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  }, [setCharacterFavoris, setComicFavoris]);
  console.log(comicFavoris);
  return isLoading ? (
    <p>Loading ..</p>
  ) : (
    <div className="favoris">
      <div className="btn-container">
        <button
          onClick={() => {
            setIsComicFavOrCharcFav("comic");
          }}
        >
          Comics
        </button>
        <button
          onClick={() => {
            setIsComicFavOrCharcFav("character");
          }}
        >
          Personnages
        </button>
      </div>

      {isComicFavOrCharcFav === "comic" ? (
        <div>
          {comicFavoris.map((favori, index) => {
            return (
              <div className="favori-container" key={index}>
                <div className="img-container">
                  <img src={favori.thumbnail.path + "." + favori.thumbnail.extension} alt="" />
                </div>
                <div className="description">
                  <h2>{favori.title}</h2>
                  <p>{favori.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div>
          {characterFavoris.map((favori, index) => {
            return (
              <div className="favori-container" key={index}>
                <div className="img-container">
                  <img src={favori.thumbnail.path + "." + favori.thumbnail.extension} alt="" />
                </div>
                <div className="description">
                  <h3>{favori.name}</h3>
                  <p>{favori.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Favoris;
