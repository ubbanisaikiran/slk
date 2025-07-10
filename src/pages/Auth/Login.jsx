import React, { useState } from "react";
import "./Login.css";
import { FaUser, FaLock } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF, FaTwitter } from "react-icons/fa";
import image1 from "../../images/loginpage.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();

  const validate = () => {
    let temp = {};
    temp.email = email ? "" : "Enter user name";
    temp.password = password ? "" : "Enter password";
    setErrors(temp);
    return Object.values(temp).every(x => x === "");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", { email, password });
      if (res.data.success) {
        navigate("/home");
      }
    } catch (err) {
      setLoginError("Enter valid username or password");
    }
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <img src={image1} alt="login visual" className="login-image" />
        <a href="#" className="create-account">Create an account</a>
      </div>

      <div className="login-right">
        <h2>Log In</h2>
        <form onSubmit={handleLogin}>
          <div className={`input-box ${errors.email && 'error'}`}>
            <FaUser className="icon" />
            <input
              type="text"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          {errors.email && <p className="error-text">{errors.email}</p>}

          <div className={`input-box ${errors.password && 'error'}`}>
            <FaLock className="icon" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {errors.password && <p className="error-text">{errors.password}</p>}

          <div className="remember-forgot">
            <input type="checkbox" />
            <label>Remember me</label>
          </div>

          {loginError && <p className="error-text">{loginError}</p>}

          <button className="login-btn" type="submit">Log In</button>

          <div className="social-login">
            <p>Or login with</p>
            <div className="social-icons">
              <FaFacebookF className="facebook" />
              <FaTwitter className="twitter" />
              <FcGoogle className="google" />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
