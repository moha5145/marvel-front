import { Link } from "react-router-dom";
import mainImage from "../assets/marvel.png";
import "../components/header.scss";
const Header = () => {
  return (
    <>
      <div className="img-container">
        <img src={mainImage} alt="" />
      </div>
      <section className="header">
        <div className="container">
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
