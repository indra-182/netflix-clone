"use client";
import { baseImgUrl } from "/lib/constants";
import { Movie } from "/lib/types";
import { InfoOutlined, PlayCircleOutlineOutlined } from "@mui/icons-material";
import { useState } from "react";
import Modal from "./Modal";

const billboardCard = ({ trendingMovie }: { trendingMovie: Movie }) => {
  const [showModal, setShowModal] = useState<boolean>(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  return (
    <>
      <div className="billboard">
        <div className="billboard-bg">
          <img
            src={`${baseImgUrl}${
              trendingMovie?.backdrop_path || trendingMovie?.poster_path
            }`}
            alt="trending-movie"
            className="billboard-bg-image"
          />
          <div className="overlay"></div>
        </div>

        <h1 className="billboard-title">
          {trendingMovie?.title || trendingMovie?.name}
        </h1>

        <p className="billboard-overview">{trendingMovie?.overview}</p>

        <div className="billboard-btns">
          <button className="billboard-btn" onClick={openModal}>
            <PlayCircleOutlineOutlined /> Play Now
          </button>
          <button className="billboard-btn" onClick={openModal}>
            <InfoOutlined /> More Info
          </button>
        </div>
      </div>

      {showModal && <Modal movie={trendingMovie} closeModal={closeModal} />}
    </>
  );
};

export default billboardCard;
