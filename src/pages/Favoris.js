import { useState } from "react";
import "./style/favoris.scss";
const Favoris = ({ comicFavoris, setComicFavoris, isLoading, characterFavoris, setCharacterFavoris }) => {
  const [isComicFavOrCharcFav, setIsComicFavOrCharcFav] = useState("comic");
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
          Favoris comics
        </button>
        <button
          onClick={() => {
            setIsComicFavOrCharcFav("character");
          }}
        >
          Favoris Personnages
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
          {characterFavoris.map((favori) => {
            return (
              <div className="favori-container">
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
