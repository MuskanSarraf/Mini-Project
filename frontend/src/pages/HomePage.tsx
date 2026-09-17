import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <main>
      <section>
        <h1>Welcome to MovieHub</h1>

        <p>
          Discover movies, explore their details,
          and create your personal watchlist.
        </p>

        <Link to="/movies">
          Browse Movies
        </Link>
      </section>

      <section>
        <h2>What you can do</h2>

        <div>
          <article>
            <h3>Discover Movies</h3>
            <p>
              Search and filter movies by genre.
            </p>
          </article>

          <article>
            <h3>Movie Details</h3>
            <p>
              View ratings, cast, director,
              duration and trailers.
            </p>
          </article>

          <article>
            <h3>Watchlist</h3>
            <p>
              Save movies you want to watch later.
            </p>
          </article>
        </div>
      </section>
    </main>
  );
};

export default HomePage;