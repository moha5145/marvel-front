import "./style/favoris.scss";
const Favoris = ({ favoris, setFavoris }) => {
  return (
    <div className="favoris">
      {favoris.map((favori) => {
        return (
          <div>
            <div>
              <img src={favori.thumbnail.path + "." + favori.thumbnail.extension} alt="" />
            </div>
            <p>{favori.title}</p>
            <p>{favori.description}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Favoris;
