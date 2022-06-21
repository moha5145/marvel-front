import "./styles/nav.scss";
import { Link } from "react-router-dom";
import Cookie from "js-cookie";

const Nav = ({ userToken, setUserToken, setShowModal }) => {
  return (
    <nav
      onClick={() => {
        setShowModal(false);
      }}
    >
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
              Cookie.remove("token");
              setUserToken(null);
            }}
          >
            <span>Se déconnecter</span>
          </Link>
        </div>
      )}
    </nav>
  );
};
export default Nav;
