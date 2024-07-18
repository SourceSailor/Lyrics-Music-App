import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { DetailsHeader, Error, Loader, RelatedSongs } from "../components";
import { setActiveSong, playPause } from "../redux/features/playerSlice";
import { useGetSongDetailsV2Query } from "../redux/services/shazamCore";

const SongDetails = ({ delay }) => {
  const dispatch = useDispatch();
  const { songid } = useParams();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const [delayed, setDelayed] = useState(false);
  const [headerRendered, setHeaderRendered] = useState(false);
  const onHeaderRendered = () => {
    setHeaderRendered(true);
  };

  // Setting a Timeout to delayed state using a prop from Song Details
  useEffect(() => {
    const timer = setTimeout(() => {
      setDelayed(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  const {
    data: songData,
    isFetching,
    error,
  } = useGetSongDetailsV2Query({ songid }, { skip: !delayed });

  // Handle Pause Function
  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  // Handle Play Function
  const handlePlayClick = (song, i) => {
    dispatch(setActiveSong({ song, data: songData?.data, i }));
    dispatch(playPause(true));
  };

  // Extract Lyrics Key From Object
  const lyricsKey = Object.keys(songData?.resources?.lyrics || {})[0];

  if (isFetching) return <Loader title="Loading song..." />;
  if (error) {
    console.log("Song Details Error: ", error);
    return <Error />;
  }

  return (
    <div className="flex flex-col">
      <DetailsHeader
        artistId=""
        delay={1000}
        songData={songData}
        onHeaderRendered={onHeaderRendered}
      />
      <div className="mt-10 mb-3">
        <h2 className="text-white text-3xl font-bold">Lyrics:</h2>
      </div>

      {/* Song Lyrics */}
      <div>
        {lyricsKey ? (
          songData?.resources?.lyrics[lyricsKey]?.attributes?.text.map(
            (line, i) => (
              <p className="text-white text-bold my-1" key={i}>
                {line}
              </p>
            )
          )
        ) : (
          <p className="text-white text-bold">Sorry, No Lyrics Found</p>
        )}
      </div>

      {/* Related Songs Component */}
      {headerRendered && (
        <RelatedSongs
          songData={songData}
          isPlaying={isPlaying}
          activeSong={activeSong}
          handlePauseClick={handlePauseClick}
          handlePlayClick={handlePlayClick}
        />
      )}
    </div>
  );
};

export default SongDetails;
