import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/login",
        {
          username,
          password,
        }
      );

      localStorage.setItem("isLoggedIn", "true");

      localStorage.setItem(
        "username",
        username
      );

      navigate("/dashboard");
    } catch (error) {
  setError("Invalid username or password");
    }
  };

  return (
    <div className="login-container">
      <form
        className="login-card"
        onSubmit={handleLogin}
      >
        <h1>IEMS</h1>
        <p>Income & Expense Management System</p>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
            setError("");
            }}
        />

       <div className="password-field">
        <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => {
            setPassword(e.target.value);
            setError("");
}}
        />

        <button
            type="button"
            className="password-toggle"
            onClick={() => setShowPassword(!showPassword)}
        >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
        </button>
    </div>

        <button type="submit">
          Login
        </button>

        {error && (
        <p className="error-message">
            {error}
        </p>
        )}
      </form>
    </div>
  );
}

export default Login;