import "./style/comic.scss";

import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Comic = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  //   setLoading(false);
  const id = useParams();
  //   console.log(id.characterId);
  const fetchData = async () => {
    const response = await axios.get(`http://localhost:4000/comics/${id.characterId}`);
    setIsLoading(false);
    setData(response.data);
    // console.log(response.data);
  };

  useEffect(() => {
    fetchData();
  }, []);
  return isLoading ? (
    <p>Loading ....</p>
  ) : (
    <section className="comic">
      {/* {console.log(data)} */}

      <div className="container">
        <div className="lg-img-container">
          <img src={data.thumbnail.path + "." + data.thumbnail.extension} alt="" />
          <div className="description">
            {console.log(data)}
            <h2>{data.name}</h2>
            <p>{data.description}</p>
          </div>
        </div>

        <div className="sm-imgs">
          {data.comics.map((comic) => {
            return (
              <div className="sm-img-container">
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
