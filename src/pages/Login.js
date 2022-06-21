import "./style/login.scss";
import axios from "axios";
import Cookies from "js-cookie";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CustomInput from "../components/CustomInput";
const Login = ({ setUserToken, setMessage, message }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      setMessage("");
      const response = await axios.post("https://marvel-back-moha.herokuapp.com/login", { email, password });
      console.log(response.data);
      const token = response.data.token;
      if (token) {
        setUserToken(token);
        Cookies.set("token", token);
        navigate("/");
      }
    } catch (error) {
      console.log(error.response.data.error);
      // if (error.response.data.error === "Compte introuvable") {
      setMessage("Email ou mot de passe incorrect");
      // }
    }
  };
  const handelSubmit = (event) => {
    event.preventDefault();
    fetchData();
  };
  return (
    <section className="login">
      <div className="container">
        <form
          onSubmit={(event) => {
            handelSubmit(event);
          }}
        >
          <CustomInput setState={setEmail} value={email} type="email" placeholder="Email" />

          <CustomInput setState={setPassword} value={password} type="password" placeholder="Password" />

          {message && <p>{message}</p>}
          <input type="submit" className="submit" value="SE CONNECTER" />
          <div>
            Pas encore de compte ?<Link to="/signup"> Inscris-toi !</Link>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Login;
