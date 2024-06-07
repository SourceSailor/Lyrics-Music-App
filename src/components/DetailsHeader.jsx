import { Link } from "react-router-dom";
import { useGetSongDataV1Query } from "../redux/services/shazamCore";

const DetailsHeader = ({ artistId, artistData, songData }) => {
  // Song Data Being Fetched From V1 Query
  const detailsHeaderId = songData?.data[0]?.id;
  const { data: songDataV1 } = useGetSongDataV1Query(
    { detailsHeaderId },
    {
      skip: !detailsHeaderId,
    },
    {
      retry: 3, // Retry up to 3 times in case of failure
    }
  );

  const artist = artistData?.artistName?.attributes;

  console.log(
    "useGetSongDataV1Query API Call From Details Header Component: ",
    songDataV1
  );

  return (
    <div className="relative w-full flex flex-col">
      <div className="w-full bg-gradient-to-l from-transpartent to-black sm:h-40 h-28" />
      <div className="absolute inset-0 flex items-center">
        <img
          className="sm:w-40 w-28 sm:h-40 h:28 rounded-full object-cover border-2 shadow-xl"
          src={artistId ? artist?.artwork?.url : songDataV1?.images?.coverart}
          alt=""
        />
        <div className="ml-5">
          <p className="font-bold sm:text-3xl text-xl text-white">
            {artistId ? artist?.name : songDataV1?.title}
          </p>
          {!artistId && (
            <Link to={`/artists/${songDataV1?.artists}`}>
              <p className="text-base text-gray-400 mt-2">
                {songDataV1?.subtitle}
              </p>
            </Link>
          )}

          <p className="text-base text-gray-400 mt-2">
            {artistId ? artist?.genreNames[0] : songDataV1?.genres?.primary}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DetailsHeader;
