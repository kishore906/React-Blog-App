import { useAuth } from "../contexts/AuthContext";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("jack@example.com");
  const [password, setPassword] = useState("jack@123");

  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    login(email, password);
  }

  useEffect(() => {
    if (isAuthenticated) navigate("/", { replace: true });
  }, [isAuthenticated, navigate]);

  return (
    <section className="loginSection">
      <h2>Login Form</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">
          <b>Email:</b>
        </label>
        <input
          type="email"
          id="email"
          placeholder="Enter Email Id.."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="password">
          <b>Password:</b>
        </label>
        <input
          type="password"
          id="password"
          placeholder="Enter Password.."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="btn post">Login</button>
      </form>
    </section>
  );
}

export default Login;
