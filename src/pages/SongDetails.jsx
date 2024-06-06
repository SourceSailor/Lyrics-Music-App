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

  // Extract Lyrics Key From Object
  const lyricsKey = Object.keys(songData?.resources?.lyrics || {})[0];

  console.log("Song Data From V2 API From Song Details Component: ", songData);

  return (
    <div className="flex flex-col">
      <DetailsHeader songData={songData} />
      <div className="mb-10">
        <h2 className="text-white text-3xl font-bold">Lyrics:</h2>
      </div>

      {/* Song Lyrics */}
      <div className="mt-5">
        {lyricsKey ? (
          songData?.resources?.lyrics[lyricsKey]?.attributes?.text.map(
            (line, i) => <p key={i}>{line}</p>
          )
        ) : (
          <p>Sorry, No Lyrics</p>
        )}
      </div>
    </div>
  );
};

export default SongDetails;
