import "../pages/style/comics.scss";
import axios from "axios";

import { useEffect, useState } from "react";
import Pagination from "../components/Pagination";

const Home = ({ comicSearch, favoris, setFavoris }) => {
  const [comics, setComics] = useState({});
  const [isLoading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [skip, setSkip] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`http://localhost:4000/comics?title=${comicSearch}&skip=${skip}`);
      setComics(response.data);
      setLoading(false);
      // console.log(response.data);
    };
    fetchData();
  }, [comicSearch, skip]);

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
                return (
                  <div className="img-container" key={comic._id}>
                    <img src={comic.thumbnail.path + "." + comic.thumbnail.extension} alt="" />

                    <div className="description">
                      <h3>{comic.title}</h3>
                      <p>{comic.description}</p>
                      <div className="fav-container">
                        {favoris.indexOf(comic) === -1 ? (
                          <i
                            className="fa-solid fa-heart red-fav"
                            onClick={() => {
                              const newFav = [...favoris];
                              newFav.push(comic);
                              setFavoris(newFav);
                              console.log(favoris);
                            }}
                          ></i>
                        ) : (
                          <i
                            className="fa-solid fa-heart white-fav "
                            onClick={() => {
                              const newFavoris = [...favoris];
                              let result = newFavoris.filter((fav) => fav._id !== comic._id);
                              setFavoris(result);
                            }}
                          ></i>
                        )}
                      </div>
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
