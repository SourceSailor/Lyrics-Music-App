import React, { useState } from "react";
import SongBar from "./SongBar";
import { useGetRelatedSongsQuery } from "../redux/services/shazamCore";

const RelatedSongs = ({
  songData,
  isPlaying,
  activeSong,
  handlePauseClick,
  handlePlayClick,
}) => {
  const [relatedSongData, setRelatedSongData] = useState(null);

  const fetchRelatedSongs = (relatedSongsId) => {
    const { data } = useGetRelatedSongsQuery({ relatedSongsId });
    setRelatedSongData(data);
  };

  // Delayed API call
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  // Call the API after a delay
  delay(2000).then(() => {
    if (songData?.data[0]?.id) {
      fetchRelatedSongs(songData.data[0].id);
    }
  });

  return (
    <div className="flex flex-col mt-10">
      <h1 className="font-bold text-3xl text-white">Related Songs</h1>
      <div className="mt-6 w-full flex flex-col">
        {relatedSongData?.map((song, i) => (
          <SongBar
            key={i}
            songData={songData}
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
