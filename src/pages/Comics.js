import "../pages/style/comics.scss";
import axios from "axios";

import Pagination from "../components/Pagination";
import { useNavigate } from "react-router-dom";

const Home = ({ comicFavoris, setComicFavoris, comics, skip, page, setPage, setSkip, isLoading, userId, userToken }) => {
  console.log("comic fav de  home", comicFavoris);
  const navigate = useNavigate();
  const fetchFavoriComics = async (comic) => {
    try {
      if (userToken) {
        const favoriToPush = {
          title: comic.title,
          description: comic.description,
          comicId: comic._id,
          thumbnail: comic.thumbnail,
          userId: userId,
        };

        const newFavoris = [...comicFavoris];

        newFavoris.push(favoriToPush);
        console.log("userId from comic", userId);
        setComicFavoris(newFavoris);
        const response = await axios.post("http://localhost:4000/comics/favoris/create", favoriToPush);
        console.log("toDb", response.data);
      } else {
        navigate("/login");
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  const deleteFavoriComics = async (comic) => {
    try {
      const ids = { _id: comic._id, userId: userId };
      const response = await axios.post("http://localhost:4000/comics/favoris/delete", ids);
      console.log("toDb", response.data);

      const newFavoris = [...comicFavoris];

      let result = newFavoris.filter((fav) => fav.comicId !== comic._id);

      setComicFavoris(result);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <section className="home">
      <div className="container">
        {isLoading ? (
          <p>Lodding ...</p>
        ) : (
          <>
            <Pagination page={page} setPage={setPage} skip={skip} setSkip={setSkip} count={comics.count} limit={comics.limit} />
            <div className="main">
              {comics.results.map((comic) => {
                // console.log(comic);
                let like = comicFavoris.find((fav) => fav.comicId === comic._id);
                return (
                  <div className="img-container" key={comic._id}>
                    <img src={comic.thumbnail.path + "." + comic.thumbnail.extension} alt="" />

                    <div className="fav-container">
                      <div>
                        {!like && (
                          <i
                            className="fa-solid fa-heart white-favori "
                            onClick={() => {
                              // console.log("fav form click");
                              fetchFavoriComics(comic);
                            }}
                          ></i>
                        )}

                        {like && (
                          <i
                            className="fa-solid fa-heart red-favori"
                            onClick={() => {
                              deleteFavoriComics(comic);
                            }}
                          ></i>
                        )}

                        {/* {comicFavoris.find((fav) => fav._id === comic._id) && (
                          
                        )} */}
                      </div>
                    </div>

                    <div className="description">
                      <h3>{comic.title}</h3>
                      <p>{comic.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <Pagination page={page} setPage={setPage} skip={skip} setSkip={setSkip} count={comics.count} limit={comics.limit} />
          </>
        )}
      </div>
    </section>
  );
};

export default Home;
