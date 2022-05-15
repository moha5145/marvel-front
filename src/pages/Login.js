import "./style/login.scss";
import axios from "axios";
import Cookies from "js-cookie";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const Login = ({ userToken, setUserToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const fetchData = async () => {
    const response = await axios.post("http://localhost:4000/login", { email, password });
    console.log(response.data);
    const token = response.data.token;
    if (token) {
      setUserToken(token);
      Cookies.set("token", token);
      navigate("/");
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
          <input
            type="email"
            value={email}
            placeholder="Email"
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
          <input
            type="password"
            value={password}
            placeholder="Password"
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
          <input type="submit" className="submit" />
        </form>
      </div>
    </section>
  );
};

export default Login;
