import "./style/character.scss";

import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Comic = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const id = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`https://marvel-back-moha.herokuapp.com/comics/${id.characterId}`);

      setIsLoading(false);
      setData(response.data);
    };
    fetchData();
  }, [id.characterId]);
  return isLoading ? (
    <p>Loading ....</p>
  ) : (
    <section className="comic">
      <div className="container">
        <div className="lg-img-container">
          <img src={data.thumbnail.path + "." + data.thumbnail.extension} alt="" />
          <div className="description">
            {/* {console.log(data)} */}
            <h2>{data.name}</h2>
            <p>{data.description}</p>
          </div>
        </div>

        <div className="sm-imgs">
          {data.comics.map((comic) => {
            return (
              <div className="sm-img-container" key={comic._id}>
                <img src={comic.thumbnail.path + "." + comic.thumbnail.extension} alt="" />
                <div className="description">
                  <h3>{comic.title}</h3>
                  <p>{comic.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Comic;
