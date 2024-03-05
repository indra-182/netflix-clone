import { fetchGenreMovies } from "/actions/movieData";
import Billboard from "/components/Billboard";
import GenreList from "/components/GenreList";
import Navbar from "/components/Navbar";
import { Genre } from "/lib/types";

const Home = async () => {
  const genres = await fetchGenreMovies();
  const movies = genres.slice(0, 10);

  return (
    <>
      <Navbar />
      <Billboard />
      <div className="all-movies">
        {movies.map((genre: Genre) => (
          <GenreList key={genre.id} title={genre.name} movies={genre.movies} />
        ))}
      </div>
    </>
  );
};

export default Home;
