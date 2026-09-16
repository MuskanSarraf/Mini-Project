import {useState } from "react";
import { useNavigate } from "react-router-dom";

import { login } from "../services/auth.service";

import type { User } from "../types/user.types";

const LoginPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleOnClick = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await login({
        email,
        password,
      });

      const user: User = data.user;

      localStorage.setItem(
        "user",
        JSON.stringify(user)
      );

      if (user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/movies");
      }
    } catch (error) {
      console.error(error);

      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Login</h1>

      <form >
        <div>
          <label>Email</label>

          <input
            type="email"
            value={email}
            onChange={(event) =>
              setEmail(event.target.value)
            }
            placeholder="Enter email"
          />
        </div>

        <div>
          <label>Password</label>

          <input
            type="password"
            value={password}
            onChange={(event) =>
              setPassword(event.target.value)
            }
            placeholder="Enter password"
          />
        </div>

        {error && <p>{error}</p>}

        <button type="button" onClick={handleOnClick} disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;