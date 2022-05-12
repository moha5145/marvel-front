import { Link } from "react-router-dom";
import mainImage from "../assets/marvel.png";
import "../components/header.scss";
const Header = ({ setComicSearch, setCharacterSearch }) => {
  return (
    <>
      <div className="img-container">
        <img src={mainImage} alt="" />
      </div>
      <section className="header">
        <div className="container">
          <input
            type="text"
            onChange={(event) => {
              setComicSearch(event.target.value);
            }}
          />

          <input
            type="text"
            onChange={(event) => {
              setCharacterSearch(event.target.value);
            }}
          />
          <nav>
            <Link to="/characters">
              <span>personnages</span>
            </Link>

            <Link to="/">
              <span>comics</span>
            </Link>

            <Link to="/">
              <span>favoris</span>
            </Link>
          </nav>
        </div>
      </section>
    </>
  );
};

export default Header;
