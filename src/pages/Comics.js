import "../pages/style/comics.scss";
import axios from "axios";

import { useEffect, useState } from "react";

const Home = ({ comicSearch }) => {
  const [comics, setComics] = useState({});
  const [isLoading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [skip, setSkip] = useState(0);

  const fetchData = async () => {
    const response = await axios.get(`http://localhost:4000/comics?title=${comicSearch}&skip=${skip}`);
    setComics(response.data);
    setLoading(false);
    // console.log(response.data);
  };
  useEffect(() => {
    fetchData();
  }, [comicSearch, skip]);
  const numberOfPage = comics.count / comics.limit;

  return (
    <section className="home">
      <div className="container">
        {isLoading ? (
          <p>Lodding ...</p>
        ) : (
          <>
            <div>
              {page > 1 && (
                <button
                  onClick={() => {
                    setSkip((prevState) => prevState - comics.limit);
                    setPage((prevState) => prevState - 1);
                  }}
                >
                  skip
                </button>
              )}
              <span>{page}</span>

              {page < Math.floor(numberOfPage) && (
                <button
                  onClick={() => {
                    setSkip((prevState) => prevState + comics.limit);
                    setPage((prevState) => prevState + 1);
                  }}
                >
                  skip
                </button>
              )}
            </div>
            <div className="main">
              {comics.results.map((comic) => {
                return (
                  <div className="img-container" key={comic._id}>
                    <img src={comic.thumbnail.path + "." + comic.thumbnail.extension} alt="" />

                    <div className="description">
                      <h3>{comic.title}</h3>
                      <p>{comic.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Home;
