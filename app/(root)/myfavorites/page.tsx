import { fetchMovieDetails } from "/actions/movieData";
import { fetchMyFavorites } from "/actions/user";
import MovieCard from "/components/MovieCard";
import Navbar from "/components/Navbar";
import { Movie } from "/lib/types";

const MyFavorites = async () => {
  const MyFavorites = await fetchMyFavorites();

  const myFavoritesDetails = await Promise.all(
    MyFavorites.map(async (movieId: number) => {
      const movieDetails = await fetchMovieDetails(movieId);
      return movieDetails;
    })
  );

  return (
    <>
      <Navbar />
      <div className="list">
        {myFavoritesDetails.map((movie: Movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </>
  );
};

export default MyFavorites;
