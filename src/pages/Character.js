import "./style/character.scss";

import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Comic = ({apiUrl}) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const { characterId } = useParams();
  console.log('characterId', characterId)

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`${apiUrl}/comics/${characterId}`);

      setIsLoading(false);
      setData(response.data);
    };
    fetchData();
  }, [characterId, apiUrl]);
  return isLoading ? (
    <p>Loading ....</p>
  ) : (
    <section className="comic">
      <div className="container">
        <div className="lg-img-container">
          <img src={data.thumbnail.path + "." + data.thumbnail.extension} alt="" />
          <div className="description">
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
