import React from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Error, Loader, SongCard } from "../components";
import PlayPause from "../components/PlayPause";
import { playPause, setActiveSong } from "../redux/features/playerSlice";
import { useGetSongsBySearchQuery } from "../redux/services/shazamCore";

// Searched Card Component
const SearchCard = ({
  song,
  i,
  isPlaying,
  activeSong,
  handlePauseClick,
  handlePlayClick,
}) => {
  console.log("song passed through search card: ", song);
  return (
    <div className="flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer">
      {/* Song Card Hover Effect */}

      <div className="relative w-full h-56 group">
        <div
          className={`absolute inset-0 justify-center items-center bg-black bg-opacity-70 group-hover:flex ${
            activeSong?.attributes?.name === song?.subtitle
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
        <img src={song?.images?.coverart} alt="song_img" />
      </div>

      {/* Song Card Song and Artist Name */}
      <div className="mt-4 flex flex-col">
        <p className="font-semibold text-white truncate text-lg">
          {/* Song Name */}
          <Link to={`/songs/${song?.hub?.actions[0]?.id}`}>{song?.title}</Link>
        </p>
        <p className="text-sm truncate text-gray-300 mt-1 ">
          {/* Artist Name */}
          <Link
            to={
              song?.subtitle
                ? `/artists/${song?.artists[0]?.adamid}`
                : "/top-artists"
            }
          >
            {song?.subtitle}
          </Link>
        </p>
      </div>
    </div>
  );
};

const Search = ({ delay }) => {
  const { searchTerm } = useParams();
  const [delayComplete, setDelayComplete] = useState(false);
  const { activeSong, isPlaying } = useSelector((state) => state.player);

  const { data, isFetching, error } = useGetSongsBySearchQuery(searchTerm, {
    skip: !delayComplete,
  });

  const songs = data?.tracks?.hits.map((song, i) => song?.track);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDelayComplete(true);
    }, delay);

    return () => clearTimeout(timer);
  }, []);

  if (isFetching) return <Loader title="Loading Songs..." />;
  if (error) return <Error />;

  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">
        Showing results for: <span>{searchTerm}</span>
      </h2>

      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {songs?.map((song, i) => (
          <SearchCard
            key={i}
            song={song}
            isPlaying={isPlaying}
            activeSong={activeSong}
            data={data}
            i={i}
          />
        ))}
      </div>
    </div>
  );
};

export default Search;
