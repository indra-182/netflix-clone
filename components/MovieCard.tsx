"use client";
import { Movie } from "/lib/types";
import { baseImgUrl } from "/lib/constants";
import { useState } from "react";
import Modal from "./Modal";

const MovieCard = ({ movie }: { movie: Movie }) => {
  const [showModal, setShowModal] = useState<boolean>(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  return (
    <>
      <div className="movie-card" onClick={openModal}>
        <img
          className="thumbnail"
          src={
            movie.backdrop_path || movie.poster_path
              ? `${baseImgUrl}${movie.backdrop_path || movie.poster_path}`
              : "/assets/images/no-image.png"
          }
          alt={movie?.title || movie?.name}
        />

        <div className="border"></div>
      </div>

      {showModal && <Modal movie={movie} closeModal={closeModal} />}
    </>
  );
};

export default MovieCard;
