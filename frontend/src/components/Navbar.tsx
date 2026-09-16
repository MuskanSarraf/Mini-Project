import { Link, useNavigate } from "react-router-dom";

import { logout } from "../services/auth.service";

const Navbar = () => {
  const navigate = useNavigate();

  const storedUser = localStorage.getItem("user");

  const user = storedUser
    ? JSON.parse(storedUser)
    : null;

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error(error);
    } finally {
      localStorage.removeItem("user");
      navigate("/login");
    }
  };

  return (
    <nav>
      <Link to="/">MovieHub</Link>

      {user && (
        <>
          <Link to="/movies">
            Movies
          </Link>

          <Link to="/watchlist">
            Watchlist
          </Link>

          {user.role === "admin" && (
            <Link to="/admin">
              Admin
            </Link>
          )}

          <button onClick={handleLogout}>
            Logout
          </button>
        </>
      )}

      {!user && (
        <>
          <Link to="/login">
            Login
          </Link>

          <Link to="/register">
            Register
          </Link>
        </>
      )}
    </nav>
  );
};

export default Navbar;