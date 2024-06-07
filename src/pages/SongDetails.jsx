import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { DetailsHeader, Error, Loader, RelatedSongs } from "../components";
import { setActiveSong, playPause } from "../redux/features/playerSlice";
import { useGetSongDetailsV2Query } from "../redux/services/shazamCore";

const SongDetails = () => {
  const dispatch = useDispatch();
  const { songid } = useParams();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data: songData } = useGetSongDetailsV2Query({ songid });

  // Handle Pause Function
  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  // Handle Play Function
  const handlePlayClick = (song, i) => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };

  // Extract Lyrics Key From Object
  const lyricsKey = Object.keys(songData?.resources?.lyrics || {})[0];

  console.log("Song Data From V2 API From Song Details Component: ", songData);

  return (
    <div className="flex flex-col">
      <DetailsHeader artistId="" songData={songData} />
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
          <p className="text-white text-bold">Sorry, No Lyrics</p>
        )}
      </div>

      {/* Related Songs Component */}
      <RelatedSongs
        songData={songData}
        isPlaying={isPlaying}
        activeSong={activeSong}
        handlePauseClick={handlePauseClick}
        handlePlayClick={handlePlayClick}
        // handlePlayClick={() => handlePlayClick(song, i)}
      />
    </div>
  );
};

export default SongDetails;
