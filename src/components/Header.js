import { useLocation } from "react-router-dom";

import mainImage from "../assets/marvel.png";
import "./styles/header.scss";
import CustomSearchInput from "./CustomSearchInput";
import Nav from "./Nav";
import { useState } from "react";

const Header = ({ setComicSearch, setCharacterSearch, userToken, setUserToken, setUser, isComicFavori, setComicFavoriSearch, setCharacterFavoriSearch }) => {
  const location = useLocation();
  const [showModal, setShowModal] = useState(false);

  console.log(location.pathname);
  return (
    <>
      <div className="header-img-container">
        <img
          className="header-img"
          src={mainImage}
          alt=""
          onClick={() => {
            setShowModal(false);
          }}
        />
        <i
          className="fa-solid fa-bars menu"
          onClick={() => {
            setShowModal(!showModal);
          }}
        ></i>
      </div>
      <section
        className="header"
        onClick={() => {
          setShowModal(false);
        }}
      >
        <div className="container">
          <div className="input-container">
            {location.pathname === "/" && <CustomSearchInput setState={setComicSearch} />}

            {location.pathname === "/characters" && <CustomSearchInput setState={setCharacterSearch} />}

            {location.pathname === "/favoris" && (
              <>{isComicFavori ? <CustomSearchInput setState={setComicFavoriSearch} /> : <CustomSearchInput setState={setCharacterFavoriSearch} />}</>
            )}
          </div>
          <section className="nav-container">
            <Nav userToken={userToken} setUserToken={setUserToken} setShowModal={setShowModal} setUser={setUser} />
          </section>
        </div>
        {showModal && (
          <section className="modal">
            <i
              className="fa-solid fa-xmark"
              onClick={() => {
                setShowModal(false);
              }}
            ></i>
            <Nav userToken={userToken} setUserToken={setUserToken} setShowModal={setShowModal} setUser={setUser} />
          </section>
        )}
      </section>
    </>
  );
};

export default Header;
