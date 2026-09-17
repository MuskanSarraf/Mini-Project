import {  useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import {
  getMovieById,
  updateMovie,
} from "../services/movie.service";

import type { Movie } from "../types/movie.types";

const EditMoviePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState<Movie | null>(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [genre, setGenre] = useState("");
  const [language, setLanguage] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [duration, setDuration] = useState("");
  const [rating, setRating] = useState("");
  const [director, setDirector] = useState("");
  const [cast, setCast] = useState("");
  const [trailerUrl, setTrailerUrl] = useState("");

  const [banner, setBanner] = useState<File | null>(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMovie = async () => {
      if (!id) {
        setError("Movie ID is missing");
        setLoading(false);
        return;
      }

      try {
        const data = await getMovieById(id);
        const movieData = data.movie;

        setMovie(movieData);

        setTitle(movieData.title);
        setDescription(movieData.description);
        setGenre(movieData.genre.join(", "));
        setLanguage(movieData.language);

        setReleaseDate(
          movieData.releaseDate.split("T")[0]
        );

        setDuration(movieData.duration.toString());
        setRating(movieData.rating.toString());
        setDirector(movieData.director);
        setCast(movieData.cast.join(", "));
        setTrailerUrl(movieData.trailerUrl);
      } catch (error) {
        console.error(error);
        setError("Failed to load movie");
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  const handleOnClick = async (

  ) => {


    if (!id) {
      return;
    }

    try {
      setSaving(true);
      setError("");

      const formData = new FormData();

      formData.append("title", title);
      formData.append("description", description);

      formData.append(
        "genre",
        JSON.stringify(
          genre
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean)
        )
      );

      formData.append("language", language);
      formData.append("releaseDate", releaseDate);
      formData.append("duration", duration);
      formData.append("rating", rating);
      formData.append("director", director);

      formData.append(
        "cast",
        JSON.stringify(
          cast
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean)
        )
      );

      formData.append("trailerUrl", trailerUrl);

      if (banner) {
        formData.append("banner", banner);
      }

      await updateMovie(id, formData);

      navigate("/admin");
    } catch (error) {
      console.error(error);
      setError("Failed to update movie");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <h2>Loading movie...</h2>;
  }

  if (error && !movie) {
    return <h2>{error}</h2>;
  }

  return (
    <div>
      <Link to="/admin">← Back to Admin</Link>

      <h1>Edit Movie</h1>

      <form >
        <div>
          <label>Title</label>
          <input
            value={title}
            onChange={(event) =>
              setTitle(event.target.value)
            }
            required
          />
        </div>

        <div>
          <label>Description</label>
          <textarea
            value={description}
            onChange={(event) =>
              setDescription(event.target.value)
            }
            required
          />
        </div>

        <div>
          <label>Genre</label>
          <input
            value={genre}
            onChange={(event) =>
              setGenre(event.target.value)
            }
            placeholder="Action, Drama, Sci-Fi"
            required
          />
        </div>

        <div>
          <label>Language</label>
          <input
            value={language}
            onChange={(event) =>
              setLanguage(event.target.value)
            }
            required
          />
        </div>

        <div>
          <label>Release Date</label>
          <input
            type="date"
            value={releaseDate}
            onChange={(event) =>
              setReleaseDate(event.target.value)
            }
            required
          />
        </div>

        <div>
          <label>Duration</label>
          <input
            type="number"
            value={duration}
            onChange={(event) =>
              setDuration(event.target.value)
            }
            required
          />
        </div>

        <div>
          <label>Rating</label>
          <input
            type="number"
            min="0"
            max="10"
            step="0.1"
            value={rating}
            onChange={(event) =>
              setRating(event.target.value)
            }
            required
          />
        </div>

        <div>
          <label>Director</label>
          <input
            value={director}
            onChange={(event) =>
              setDirector(event.target.value)
            }
            required
          />
        </div>

        <div>
          <label>Cast</label>
          <input
            value={cast}
            onChange={(event) =>
              setCast(event.target.value)
            }
            placeholder="Actor 1, Actor 2"
            required
          />
        </div>

        <div>
          <label>Trailer URL</label>
          <input
            type="url"
            value={trailerUrl}
            onChange={(event) =>
              setTrailerUrl(event.target.value)
            }
            required
          />
        </div>

        <div>
          <label>Replace Banner</label>

          <input
            type="file"
            accept="image/*"
            onChange={(event) => {
              setBanner(
                event.target.files?.[0] ?? null
              );
            }}
          />
        </div>

        {movie && (
          <div>
            <p>Current Banner</p>

            <img
              src={movie.banner.url}
              alt={movie.title}
              width="250"
            />
          </div>
        )}

        {error && <p>{error}</p>}

        <button
          type="button"
          disabled={saving}
          onClick={handleOnClick}
        >
          {saving ? "Saving..." : "Update Movie"}
        </button>
      </form>
    </div>
  );
};

export default EditMoviePage;