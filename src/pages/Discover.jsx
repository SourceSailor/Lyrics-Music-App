import { Error, Loader, SongCard } from "../components";
import { genres } from "../assets/constants";
import { useGetTopChartsQuery } from "../redux/services/shazamCore";

const Discover = () => {
  const genreTitle = "Pop";
  const { data: discoverSongData, isFetching, error } = useGetTopChartsQuery();

  if (isFetching) return <Loader title="Loading Songs..." />;
  if (error) return <Error />;

  return (
    <div className="flex flex-col">
      <div className="w-full flex justify-between items-center flex-row sm:flex-col mt-4 mb-10">
        <h2 className="font-bold text-3xl text-white">Discover {genreTitle}</h2>

        {/* Genre Selector */}
        <select
          name=""
          id=""
          className="bg-black text-gray-300 text-sm rounded-lg outline-none -mt-0 sm:mt-5 py-2 px-2"
          onChange={() => {}}
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
        {discoverSongData?.map((song, i) => (
          <SongCard key={i} discoverSongData={song} i={i} />
        ))}
      </div>
    </div>
  );
};

export default Discover;
