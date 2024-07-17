import { Error, Loader, SongCard } from "../components";
import { genres } from "../assets/constants";
import { useGetSongsByGenreQuery } from "../redux/services/shazamCore";
import { useDispatch, useSelector } from "react-redux";
import { selectGenreListId } from "../redux/features/playerSlice";
import { useState, useEffect } from "react";

const Discover = () => {
  const dispatch = useDispatch();
  const [delayComplete, setDelayComplete] = useState(false);
  const { activeSong, isPlaying, genreListId } = useSelector(
    (state) => state.player
  );
  const genreTitle =
    genres.find((genre) => genre.value === genreListId)?.title || "Pop";

  // Fetching data after delay
  const { data, isFetching, error } = useGetSongsByGenreQuery(
    genreListId || "POP",
    {
      skip: !delayComplete,
    }
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setDelayComplete(true);
    }, 2000); // setting a 2-second delay

    return () => clearTimeout(timer);
  }, []);

  if (isFetching) return <Loader title={`Loading ${genreTitle} Songs...`} />;
  if (error) {
    console.log("Discover Songs Error: ", error);
    return <Error />;
  }

  return (
    <div className="flex flex-col">
      <div className="w-full flex justify-between items-center flex-row sm:flex-col mt-4 mb-10">
        <h2 className="font-bold text-3xl text-white">Discover {genreTitle}</h2>

        {/* Genre Selector */}
        <select
          name="genres"
          id="genres"
          value={genreListId || "Pop"}
          className="bg-black text-gray-300 text-sm rounded-lg outline-none sm:mt-5 py-2 px-2"
          onChange={(e) => dispatch(selectGenreListId(e.target.value))}
        >
          {genres.map((genre, i) => (
            <option key={i} value={genre.value}>
              {genre.title}
            </option>
          ))}
        </select>
      </div>

      {/* Discover API Data Mapping */}
      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {data?.map((song, i) => (
          <SongCard
            key={i}
            data={data}
            song={song}
            i={i}
            isPlaying={isPlaying}
            activeSong={activeSong}
          />
        ))}
      </div>
    </div>
  );
};

export default Discover;
