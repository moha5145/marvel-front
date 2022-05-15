import { Link, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import mainImage from "../assets/marvel.png";
import "../components/header.scss";

const Header = ({ setComicSearch, setCharacterSearch, userToken, setUserToken }) => {
  const location = useLocation();
  // console.log(location);
  return (
    <>
      <div className="img-container">
        <img src={mainImage} alt="" />
      </div>
      <section className="header">
        <div className="container">
          {location.pathname === "/" && (
            <div className="search-container">
              <i className="fa-solid fa-magnifying-glass loop"></i>
              <input
                className="search-bar"
                placeholder="search"
                type="text"
                onChange={(event) => {
                  setComicSearch(event.target.value);
                }}
              />
            </div>
          )}

          {location.pathname === "/characters" && (
            <div className="search-container">
              <i className="fa-solid fa-magnifying-glass loop"></i>
              <input
                className="search-bar"
                placeholder="search"
                type="text"
                onChange={(event) => {
                  setCharacterSearch(event.target.value);
                }}
              />
            </div>
          )}

          <nav>
            <Link to="/characters">
              <span>personnages</span>
            </Link>

            <Link to="/">
              <span>comics</span>
            </Link>

            <Link to="/favoris">
              <span>favoris</span>
            </Link>

            {!userToken && (
              <div className="user-container">
                <Link to="/signup">
                  <span>S'inscrire</span>
                </Link>

                <Link to="/login">
                  <span>se connecter</span>
                </Link>
              </div>
            )}

            {userToken && (
              <div className="disconnect">
                <Link
                  to="/login"
                  onClick={() => {
                    Cookies.remove("token");
                    setUserToken(null);
                  }}
                >
                  <span>Se déconnecter</span>
                </Link>
              </div>
            )}
          </nav>
        </div>
      </section>
    </>
  );
};

export default Header;
