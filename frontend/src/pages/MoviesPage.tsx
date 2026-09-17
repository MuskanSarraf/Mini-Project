import { useEffect, useState } from "react";

import { getMovies } from "../services/movie.service";

import type { Movie } from "../types/movie.types";

import MovieCard from "../components/MovieCard";

const MoviesPage = () => {
  const [movies, setMovies] = useState<Movie[]>([]);

  const [search, setSearch] = useState("");

  const [selectedGenre, setSelectedGenre] =
    useState("All");

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

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

  const genres = [
    "All",
    ...new Set(
      movies.flatMap((movie) => movie.genre)
    ),
  ];

  const filteredMovies = movies.filter((movie) => {
    const matchesSearch =
      movie.title
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesGenre =
      selectedGenre === "All" ||
      movie.genre.includes(selectedGenre);

    return matchesSearch && matchesGenre;
  });

  if (loading) {
    return <h2>Loading movies...</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  return (
    <div>
      <h1>Movies</h1>

      <div>
        <input
          type="text"
          placeholder="Search movies..."
          value={search}
          onChange={(event) =>
            setSearch(event.target.value)
          }
        />

        <select
          value={selectedGenre}
          onChange={(event) =>
            setSelectedGenre(event.target.value)
          }
        >
          {genres.map((genre) => (
            <option
              key={genre}
              value={genre}
            >
              {genre}
            </option>
          ))}
        </select>
      </div>

      <div>
        {filteredMovies.map((movie) => (
          <MovieCard
            key={movie._id}
            movie={movie}
          />
        ))}
      </div>

      {filteredMovies.length === 0 && (
        <p>No movies found.</p>
      )}
    </div>
  );
};

export default MoviesPage;