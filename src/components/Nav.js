import "./styles/nav.scss";

import { Link } from "react-router-dom";

const Nav = ({ userToken, setUserToken, setShowModal, setUser }) => {
  return (
    <nav
      onClick={() => {
        setShowModal(false);
      }}
    >
      <Link to="/">
        <span>personnages</span>
      </Link>

      <Link to="/comics">
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
              setUser(null, null);
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
