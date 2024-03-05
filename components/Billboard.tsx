import BillboardCard from "./BillboardCard";
import { fetchTrendingMovies } from "/actions/movieData";

const Billboard = async () => {
  // fetch data dari server side
  const data = await fetchTrendingMovies();
  const randomNumber = Math.floor(Math.random() * data.length);
  const trendingMovie = data[randomNumber];
  return (
    <div>
      <BillboardCard trendingMovie={trendingMovie} />
    </div>
  );
};

export default Billboard;
