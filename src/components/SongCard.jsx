import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import PlayPause from "./PlayPause";
import { playPause, setActiveSong } from "../redux/features/playerSlice";

const SongCard = ({ data, i, song, isPlaying, activeSong }) => {
  const dispatch = useDispatch();

  // Handle Pause Function
  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  // Handle Play Function
  const handlePlayClick = () => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };

  return (
    <div className="flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer">
      {/* Song Card Hover Effect */}

      <div className="relative w-full h-56 group">
        <div
          className={`absolute inset-0 justify-center items-center bg-black bg-opacity-70 group-hover:flex ${
            activeSong?.attributes?.name === song?.attributes?.name
              ? "flex bg-black bg-opacity-70"
              : "hidden"
          }`}
        >
          <PlayPause
            song={song}
            isPlaying={isPlaying}
            activeSong={activeSong}
            handlePause={handlePauseClick}
            handlePlay={handlePlayClick}
          />
        </div>

        {/* Song Card Image */}
        <img src={song?.attributes?.artwork?.url} alt="song_img" />
      </div>

      {/* Song Card Song and Artist Name */}
      <div className="mt-4 flex flex-col">
        <p className="font-semibold text-white truncate text-lg">
          {/* Song Name */}
          <Link to={`/songs/${song?.id}`}>{song?.attributes?.name}</Link>
        </p>
        <p className="text-sm truncate text-gray-300 mt-1 ">
          {/* Artist Name */}
          <Link
            to={
              song?.attributes?.name
                ? `/artists/${song?.attributes?.artistName}`
                : "/top-artists"
            }
          >
            {song?.attributes?.artistName}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SongCard;
