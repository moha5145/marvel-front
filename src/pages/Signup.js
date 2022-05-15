import "./style/signup.scss";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Signup = ({ userToken, setUserToken }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();
  const fetchData = async () => {
    try {
      const user = {
        username: username,
        email: email,
        password: password,
      };
      console.log(user);
      const response = await axios.post("http://localhost:4000/signup", user);
      console.log(response.data);
      const token = response.data.token;
      if (token) {
        Cookies.set("token", token);
        setUserToken(token);
        navigate("/");
      }
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const handelSubmit = (event) => {
    event.preventDefault();
    fetchData();
  };

  return (
    <div className="sign-up">
      <form
        onSubmit={(event) => {
          handelSubmit(event);
        }}
      >
        <input
          type="text"
          placeholder="User name"
          value={username}
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        <input
          type="password"
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={(event) => {
            setConfirmPassword(event.target.value);
          }}
        />
        <input type="submit" className="submit" />
      </form>
    </div>
  );
};

export default Signup;
