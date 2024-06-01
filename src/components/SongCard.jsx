import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import PlayPause from "./PlayPause";
import { playPause, setActiveSong } from "../redux/features/playerSlice";

const SongCard = ({ discoverSongData, i }) => {
  const activeSong = "TEST";
  return (
    <div className="flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer">
      <div className="relative w-full h-56 group">
        <div
          className={`absolute inset-0 justify-center items-center bg-black bg-opacity-50 group-hover:flex ${
            activeSong.title === discoverSongData?.attributes?.name
              ? "flex bg-black bg-opacity-70"
              : "hidden"
          }`}
        >
          <PlayPause />
        </div>
        <img src={discoverSongData?.attributes?.artwork?.url} alt="song_img" />
      </div>
      <div className="mt-4 flex flex-col">
        <p className="font-semibold text-white truncate text-lg">
          <Link to={`/songs/${discoverSongData?.id}`}>
            {discoverSongData?.attributes?.name}
          </Link>
        </p>
        <p className="text-sm truncate text-gray-300 mt-1 ">
          <Link
            to={
              discoverSongData?.attributes?.name
                ? `/artists/${discoverSongData?.attributes?.artistName}`
                : "/top-artists"
            }
          >
            {discoverSongData?.attributes?.artistName}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SongCard;
