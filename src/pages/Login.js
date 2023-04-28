import "./style/login.scss";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CustomInput from "../components/CustomInput";
const Login = ({ setMessage, message, setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      setMessage("");
      const response = await axios.post("https://marvel-back-k3xo.onrender.com/login", { email, password });
      const token = response.data.token;
      const userId = response.data.id;

      if (token) {
        setUser(token, userId);
        navigate("/");
      }
    } catch (error) {
      console.log(error.response.data.error);

      setMessage("Email ou mot de passe incorrect");
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
