import React from "react";
import SongBar from "./SongBar";
import { useDispatch } from "react-redux";
import { Error, Loader } from "../components";
import { playPause, setActiveSong } from "../redux/features/playerSlice";
import { useGetRelatedSongsQuery } from "../redux/services/shazamCore";
import { useState, useEffect } from "react";

const RelatedSongs = ({
  songData,
  isPlaying,
  activeSong,
  handlePauseClick,
}) => {
  const relatedSongsId = songData?.data[0]?.id;
  const dispatch = useDispatch();

  const {
    data: relatedSongData,
    isFetching,
    error,
  } = useGetRelatedSongsQuery({ relatedSongsId }, { skip: !relatedSongsId });

  const handlePlayClick = (song, i) => {
    dispatch(setActiveSong({ song, data: relatedSongData, i }));
    dispatch(playPause(true));
  };

  if (isFetching) return <Loader title="Loading Related Songs..." />;
  if (error) {
    console.log("Related Songs Error: ", error);
    return <Error />;
  }

  return (
    <div className="flex flex-col mt-10">
      <h1 className="font-bold text-3xl text-white">Related Songs</h1>

      <div className="mt-6 w-full flex flex-col">
        {relatedSongData?.map((song, i) => (
          <SongBar
            key={`${song.id}-${i}`}
            song={song}
            i={i}
            isPlaying={isPlaying}
            activeSong={activeSong}
            handlePauseClick={handlePauseClick}
            handlePlayClick={handlePlayClick}
          />
        ))}
      </div>
    </div>
  );
};

export default RelatedSongs;
