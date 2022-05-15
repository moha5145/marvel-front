import "../pages/style/comics.scss";
import axios from "axios";

import Pagination from "../components/Pagination";

const Home = ({ comicFavoris, setComicFavoris, comics, skip, page, setPage, setSkip, isLoading }) => {
  const fetchFavoriComics = async (comic) => {
    try {
      const newFavoris = [...comicFavoris];
      newFavoris.push(comic);

      setComicFavoris(newFavoris);
      const response = await axios.post("https://marvel-back-moha.herokuapp.com/comics/favoris/post", comic);
      console.log("toDb", response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteFavoriComics = async (comic) => {
    try {
      const response = await axios.post("https://marvel-back-moha.herokuapp.com/comics/favoris/delete", comic);
      console.log("toDb", response.data);

      const newFavoris = [...comicFavoris];

      let result = newFavoris.filter((fav) => fav._id !== comic._id);

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
              {comics.results.map((comic, index) => {
                return (
                  <div className="img-container" key={comic._id}>
                    <img src={comic.thumbnail.path + "." + comic.thumbnail.extension} alt="" />

                    <div className="fav-container">
                      <div>
                        {!comicFavoris.find((fav) => fav._id === comic._id) && (
                          <i
                            className="fa-solid fa-heart white-favori "
                            onClick={() => {
                              fetchFavoriComics(comic);
                            }}
                          ></i>
                        )}

                        {comicFavoris.find((fav) => fav._id === comic._id) && (
                          <i
                            className="fa-solid fa-heart red-favori"
                            onClick={() => {
                              deleteFavoriComics(comic);
                            }}
                          ></i>
                        )}
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
