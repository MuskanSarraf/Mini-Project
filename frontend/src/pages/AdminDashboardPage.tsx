import { useEffect, useState } from "react";
import AddMovieForm from "../components/AddMovieForm";
import { Link } from "react-router-dom";

import {
  getMovies,
  deleteMovie,
} from "../services/movie.service";

import type { Movie } from "../types/movie.types";

const AdminDashboardPage = () => {
  const [movies, setMovies] = useState<Movie[]>([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [deleteLoading, setDeleteLoading] =
    useState<string | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await getMovies();

        setMovies(data.movies);
      } catch (error) {
        console.error(error);

        setError("Failed to load movies");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this movie?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeleteLoading(id);

      await deleteMovie(id);

      setMovies((currentMovies) =>
        currentMovies.filter(
          (movie) => movie._id !== id
        )
      );
    } catch (error) {
      console.error(error);

      setError("Failed to delete movie");
    } finally {
      setDeleteLoading(null);
    }
  };

  if (loading) {
    return <h2>Loading admin dashboard...</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  return (
    <div>
      <h1>Admin Dashboard</h1>

      <AddMovieForm
        onMovieCreated={() => {
          window.location.reload();
        }}
      />

      <p>
        Total Movies: {movies.length}
      </p>

      <div className="movie-grid">
        {movies.map((movie) => (
          <article key={movie._id}>
            <img
              src={movie.banner.url}
              alt={movie.title}
              width="250"
            />

            <h2>{movie.title}</h2>

            <p>
              {movie.genre.join(" • ")}
            </p>

            <p>
              Rating: {movie.rating}/10
            </p>

            <p>
              {movie.language} •{" "}
              {movie.duration} min
            </p>

            <Link to={`/admin/edit/${movie._id}`}>
              Edit
            </Link>

            <button
              onClick={() =>
                handleDelete(movie._id)
              }
              disabled={
                deleteLoading === movie._id
              }
            >
              {deleteLoading === movie._id
                ? "Deleting..."
                : "Delete"}
            </button>
          </article>
        ))}
      </div>

      {movies.length === 0 && (
        <p>No movies available.</p>
      )}
    </div>
  );
};

export default AdminDashboardPage;