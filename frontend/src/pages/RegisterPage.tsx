import {  useState } from "react";
import { useNavigate } from "react-router-dom";

import { register } from "../services/auth.service";

const RegisterPage = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleOnClick = async () => {
    try {
      setLoading(true);
      setError("");

      await register({
        name,
        email,
        password,
      });

      navigate("/login");
    } catch (error) {
      console.error(error);

      setError("Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Create Account</h1>

      <form >
        <div>
          <label>Name</label>

          <input
            type="text"
            value={name}
            onChange={(event) =>
              setName(event.target.value)
            }
            placeholder="Enter name"
          />
        </div>

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
          {loading
            ? "Creating account..."
            : "Register"}
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;