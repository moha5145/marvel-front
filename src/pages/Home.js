import "../pages/style/home.scss";

const Home = ({ comics, isLoading }) => {
  return (
    <section className="home">
      <div className="container">
        {isLoading ? (
          <p>Lodding ...</p>
        ) : (
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
        )}
      </div>
    </section>
  );
};

export default Home;
