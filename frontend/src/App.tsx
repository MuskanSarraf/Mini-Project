import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import MoviesPage from "./pages/MoviesPage";
import MovieDetailsPage from "./pages/MovieDetailsPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import WatchlistPage from "./pages/WatchlistPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route
          path="/login"
          element={<LoginPage />}
        />

        <Route
          path="/register"
          element={<RegisterPage />}
        />

        <Route
          path="/movies"
          element={<MoviesPage />}
        />

        <Route
          path="/movies/:id"
          element={<MovieDetailsPage />}
        />

        <Route
          path="/watchlist"
          element={<WatchlistPage />}
        />

        <Route
          path="/admin"
          element={<AdminDashboardPage />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;