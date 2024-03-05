"use client";
import { useEffect, useState } from "react";
import { Genre, Movie, Video } from "/lib/types";
import { AddCircle, CancelRounded, RemoveCircle } from "@mui/icons-material";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Loader from "./Loader";

interface ModalProps {
  movie: Movie;
  closeModal: () => void;
}

interface User {
  username: string;
  email: string;
  favorites: number[];
}
const Modal = ({ movie, closeModal }: ModalProps) => {
  const router = useRouter();
  const [video, setVideo] = useState<string>("");
  const [genres, setGenres] = useState<Genre[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);

  const { data: session } = useSession();

  useEffect(() => {
    getMovieDetails();
    if (session) {
      fetchUser();
    }
  }, [movie, session]);

  const fetchUser = async () => {
    try {
      const res = await fetch(`/api/user/${session?.user?.email}`);
      const data = await res.json();
      setUser(data);
      setIsFavorite(data.favorites.includes(movie.id));
      setLoading(false);
    } catch (err) {
      console.log("Error fetching user", err);
    }
  };

  const getMovieDetails = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`,
      },
    };
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/movie/${movie.id}?append_to_response=videos`,
        options
      );
      const data = await res.json();

      if (data?.videos) {
        const index = data.videos.results.findIndex(
          (video: Video) => video.type === "Trailer"
        );
        setVideo(data.videos.results[index].key);
      }

      if (data?.genres) {
        setGenres(data.genres);
      }
    } catch (err) {
      console.log("Error fetching movie details", err);
    }
  };

  const handleMyFavorites = async () => {
    try {
      const res = await fetch(`/api/user/${session?.user?.email}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ movieId: movie.id }),
      });
      const data = await res.json();
      setUser(data);
      setIsFavorite(data.favorites.includes(movie.id));
      router.refresh();
    } catch (err) {
      console.log("Failed to handle my list", err);
    }
  };

  return loading ? (
    <Loader />
  ) : (
    <div className="modal">
      <button className="modal-close" onClick={closeModal}>
        <CancelRounded
          sx={{
            color: "white",
            fontSize: "40px",
            cursor: "pointer",
            ":hover": { color: "red" },
          }}
        />
      </button>
      <iframe
        className="modal-video"
        src={`https://www.youtube.com/embed/${video}?autoplay=1&mute=1`}
        loading="lazy"
        allowFullScreen
      />
      <div className="modal-content">
        <div className="flex justify-between">
          <div className="flex gap-2">
            <p className="font-nsans-bold">Name : </p>
            <p className="font-nsans-light">{movie?.title || movie?.name}</p>
          </div>
          <div className="flex gap-3">
            <p className="font-nsans-bold">
              {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
            </p>
            {isFavorite ? (
              <RemoveCircle
                className="cursor-pointer text-pink-1"
                onClick={handleMyFavorites}
              />
            ) : (
              <AddCircle
                className="cursor-pointer text-pink-1"
                onClick={handleMyFavorites}
              />
            )}
          </div>
        </div>
        <div className="flex gap-2">
          <p className="font-nsans-bold">Release Date : </p>
          <p className="font-nsans-light">{movie?.release_date}</p>
        </div>
        <p className="font-nsans-light">{movie?.overview}</p>
        <div className="flex gap-2">
          <p className="font-nsans-bold">Rating : </p>
          <p className="font-nsans-light">{movie?.vote_average}</p>
        </div>
        <div className="flex gap-2">
          <p className="font-nsans-bold">Genres : </p>
          <p className="font-nsans-light">
            {/* map semua genre, kemudian gabungkan dengan koma */}
            {genres.map((genre) => genre.name).join(", ")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Modal;
