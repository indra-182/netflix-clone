import { Movie } from "/lib/types";
import MovieCard from "./MovieCard";

interface GenreListProps {
  title: string;
  movies: Movie[];
}
const GenreList = ({ title, movies }: GenreListProps) => {
  return (
    <div className="category">
      <h1 className="category-title">{title}</h1>
      <div className="movie-list">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default GenreList;
