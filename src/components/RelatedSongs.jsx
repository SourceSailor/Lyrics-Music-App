import SongBar from "./SongBar";
import { useState, useEffect } from "react";
import { Error, Loader } from "../components";
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

  // Setting a Timeout to delayed state using a prop from Song Details
  useEffect(() => {
    const timer = setTimeout(() => {
      setDelayed(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  // Creating conditional logic, fetching the data from the API to execute after setDelayed and relatedSongsId is truthy
  const {
    data: relatedSongData,
    isFetching,
    error,
  } = useGetRelatedSongsQuery(
    { relatedSongsId },
    { skip: !delayed || !relatedSongsId }
  );

  // Fetching and Error Handeling
  if (isFetching) return <Loader title="Loading Related Songs..." />;
  if (error) return <Error />;

  return (
    <div className="flex flex-col mt-10">
      <h1 className="font-bold text-3xl text-white">Related Songs</h1>

      {/* Mapping relatedSongsData to Song Bar */}
      <div className="mt-6 w-full flex flex-col">
        {relatedSongData?.map((song, i) => (
          <SongBar key={i} song={song} i={i} />
        ))}
      </div>
    </div>
  );
};

export default RelatedSongs;
