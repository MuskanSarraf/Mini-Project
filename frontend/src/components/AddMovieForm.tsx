import {
  useState,
} from "react";

import { createMovie } from "../services/movie.service";

interface AddMovieFormProps {
  onMovieCreated: () => void;
}

const AddMovieForm = ({
  onMovieCreated,
}: AddMovieFormProps) => {
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

  const [banner, setBanner] =
    useState<File | null>(null);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const handleOnClick = async () => {

    if (!banner) {
      setError("Please select a movie banner");
      return;
    }

    try {
      setLoading(true);
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

      formData.append("banner", banner);

      await createMovie(formData);

      setTitle("");
      setDescription("");
      setGenre("");
      setLanguage("");
      setReleaseDate("");
      setDuration("");
      setRating("");
      setDirector("");
      setCast("");
      setTrailerUrl("");
      setBanner(null);

      onMovieCreated();
    } catch (error) {
      console.error(error);

      setError("Failed to create movie");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form >
      <h2>Add Movie</h2>

      <div>
        <label>Title</label>

        <input
          type="text"
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
          type="text"
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
          type="text"
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
        <label>Duration (minutes)</label>

        <input
          type="number"
          value={duration}
          onChange={(event) =>
            setDuration(event.target.value)
          }
          min="1"
          required
        />
      </div>

      <div>
        <label>Rating</label>

        <input
          type="number"
          value={rating}
          onChange={(event) =>
            setRating(event.target.value)
          }
          min="0"
          max="10"
          step="0.1"
          required
        />
      </div>

      <div>
        <label>Director</label>

        <input
          type="text"
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
          type="text"
          value={cast}
          onChange={(event) =>
            setCast(event.target.value)
          }
          placeholder="Actor 1, Actor 2, Actor 3"
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
          placeholder="https://youtube.com/..."
          required
        />
      </div>

      <div>
        <label>Movie Banner</label>

        <input
          type="file"
          accept="image/*"
          onChange={(event) => {
            const file =
              event.target.files?.[0] ?? null;

            setBanner(file);
          }}
          required
        />
      </div>

      {error && <p>{error}</p>}

      <button
        type="button"
        disabled={loading}
        onClick={handleOnClick}
      >
        {loading
          ? "Creating Movie..."
          : "Add Movie"}
      </button>
    </form>
  );
};

export default AddMovieForm;