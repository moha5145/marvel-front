import "./style/signup.scss";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import CustomInput from "../components/CustomInput";

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
      const response = await axios.post("https://marvel-back-moha.herokuapp.com/signup", user);
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
        <CustomInput setState={setUsername} value={username} type="text" placeholder="User name" />

        <CustomInput setState={setEmail} value={email} type="email" placeholder="Email" />

        <CustomInput setState={setPassword} value={password} type="password" placeholder="Password" />

        <CustomInput setState={setConfirmPassword} value={confirmPassword} type="password" placeholder="Confirm password" />

        <input type="submit" className="submit" />

        <div>
          Tu as déjà un compte ?<Link to="/login"> Connecte-toi !</Link>
        </div>
      </form>
    </div>
  );
};

export default Signup;
