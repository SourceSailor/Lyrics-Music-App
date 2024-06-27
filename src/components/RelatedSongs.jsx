import SongBar from "./SongBar";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Error, Loader } from "../components";
import { playPause, setActiveSong } from "../redux/features/playerSlice";
import { useGetRelatedSongsQuery } from "../redux/services/shazamCore";

const RelatedSongs = ({
  delay,
  songData,
  isPlaying,
  activeSong,
  handlePauseClick,
  handlePlayClick,
}) => {
  const relatedSongsId = songData?.data[0]?.id;
  const [delayed, setDelayed] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const timer = setTimeout(() => {
      setDelayed(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  const {
    data: relatedSongData,
    isFetching,
    error,
  } = useGetRelatedSongsQuery(
    { relatedSongsId },
    { skip: !delayed || !relatedSongsId }
  );

  if (isFetching) return <Loader title="Loading Related Songs..." />;
  if (error) return <Error />;

  return (
    <div className="flex flex-col mt-10">
      <h1 className="font-bold text-3xl text-white">Related Songs</h1>

      <div className="mt-6 w-full flex flex-col">
        {relatedSongData?.map((song, i) => (
          <SongBar
            key={i}
            song={song}
            i={i}
            isPlaying={isPlaying}
            activeSong={activeSong}
            handlePauseClick={handlePauseClick}
            handlePlayClick={() => handlePlayClick(song, i)}
          />
        ))}
      </div>
    </div>
  );
};

export default RelatedSongs;
