import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BallTriangle } from "react-loader-spinner";
import "./style/favoris.scss";
const Favoris = ({
  comicFavoris,
  setComicFavoris,
  characterFavoris,
  setCharacterFavoris,
  userId,

  isComicFavori,
  setIsComicFavori,

  comicFavoriSearch,
  characterFavoriSearch,
}) => {
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (userId) {
          const response = await axios.get(`https://marvel-back-moha.herokuapp.com/character/favoris/${userId}?name=${characterFavoriSearch}`);
          setCharacterFavoris(response.data);

          const responseComicFavoris = await axios.get(`https://marvel-back-moha.herokuapp.com/comics/favoris/${userId}?title=${comicFavoriSearch}`);
          setComicFavoris(responseComicFavoris.data);

          setIsLoading(false);
        } else {
          navigate("/login");
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  }, [setCharacterFavoris, userId, navigate, setComicFavoris, characterFavoriSearch, comicFavoriSearch]);

  return isLoading ? (
    <div className="spiner ">
      <BallTriangle heigth="100" width="100" color="#ee171f" ariaLabel="loading-indicator" />
    </div>
  ) : (
    <div className="favoris">
      <div className="btn-container">
        <button
          onClick={() => {
            setIsComicFavori(true);
          }}
        >
          Comics
        </button>
        <button
          onClick={() => {
            setIsComicFavori(false);
          }}
        >
          Personnages
        </button>
      </div>

      <div>
        {isComicFavori ? (
          <div>
            {comicFavoris.map((favori, index) => {
              return (
                <div className="favori-container" key={index}>
                  <div className="img-container">{favori.thumbnail && <img src={favori.thumbnail.path + "." + favori.thumbnail.extension} alt="" />}</div>
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
    </div>
  );
};

export default Favoris;
