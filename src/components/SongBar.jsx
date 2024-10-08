import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PlayPause from "./PlayPause";
import { playPause, setActiveSong } from "../redux/features/playerSlice";
import { useDispatch, useSelector } from "react-redux";

import { useGetSongDataV1Query } from "../redux/services/shazamCore";

const SongBar = ({
  song,
  i,
  artistId,
  isPlaying,
  activeSong,
  handlePauseClick,
  handlePlayClick,
}) => {
  const relatedSongId1 = song?.hub?.actions?.[0]?.id;

  return (
    <div
      className={`w-full flex flex-row items-center hover:bg-[#4c426e] ${
        activeSong?.key === song?.key ? "bg-[#4c426e]" : "bg-transparent"
      } py-2 p-4 rounded-lg cursor-pointer mb-2`}
    >
      <h3 className="font-bold text-base text-white mr-3">{i + 1}.</h3>
      <div className="flex-1 flex flex-row justify-between items-center">
        <img
          className="w-20 h-20 rounded-lg"
          src={
            artistId
              ? song?.attributes?.artwork?.url
                  .replace("{w}", "125")
                  .replace("{h}", "125")
              : song?.images?.coverart
          }
          alt={song?.title}
        />
        <div className="flex-1 flex flex-col justify-center mx-3">
          {!artistId ? (
            <Link
              to={
                !relatedSongId1
                  ? `/songs/${song?.hub?.actions?.id}`
                  : `/songs/${song?.hub?.actions[0]?.id}`
              }
            >
              <p className="text-xl font-bold text-white">{song?.title}</p>
            </Link>
          ) : (
            <p className="text-xl font-bold text-white">
              {song?.attributes?.name}
            </p>
          )}
          <p className="text-base text-gray-300 mt-1">
            {artistId ? song?.attributes?.albumName : song?.subtitle}
          </p>
        </div>
      </div>
      {!artistId ? (
        <PlayPause
          isPlaying={isPlaying && activeSong?.key === song?.key}
          activeSong={activeSong}
          song={song}
          handlePause={handlePauseClick}
          handlePlay={() => handlePlayClick(song, i)}
        />
      ) : null}
    </div>
  );
};

export default SongBar;
