import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style/favoris.scss";
const Favoris = ({ comicFavoris, setComicFavoris, characterFavoris, setCharacterFavoris, userId }) => {
  const [isComicFavOrCharcFav, setIsComicFavOrCharcFav] = useState("comic");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (userId) {
          const response = await axios.get(`http://localhost:4000/character/favoris/${userId}`);
          setCharacterFavoris(response.data);

          const responseComicFavoris = await axios.get(`http://localhost:4000/comics/favoris/${userId}`);
          setComicFavoris(responseComicFavoris.data);

          setIsLoading(false);
          console.log(response.data);
        } else {
          navigate("/login");
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  }, [setCharacterFavoris, setComicFavoris, userId, navigate]);
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
