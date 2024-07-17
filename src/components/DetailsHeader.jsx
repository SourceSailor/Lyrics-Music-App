import { Link } from "react-router-dom";
import { useGetSongDataV1Query } from "../redux/services/shazamCore";
import { delay } from "lodash";
import { useEffect, useState } from "react";
import { Error, Loader } from "../components";

const DetailsHeader = ({
  artistId,
  artistData,
  songData,
  delay,
  onHeaderRendered,
}) => {
  const detailsHeaderId = songData?.data[0]?.id;
  const [delayed, setDelayed] = useState(false);

  // Delay API Response
  useEffect(() => {
    const timer = setTimeout(() => {
      setDelayed(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  const {
    data: songDataV1,
    isFetching,
    error,
  } = useGetSongDataV1Query(
    { detailsHeaderId },
    {
      skip: !detailsHeaderId || !delayed,
    }
  );

  useEffect(() => {
    if (!isFetching && !error && songDataV1) {
      onHeaderRendered();
    }
  }, [isFetching, error, songDataV1, artistData, onHeaderRendered]);

  if (isFetching) return <Loader title="Loading song details..." />;
  if (error) {
    console.log("Song Details Error: ", error);
    return <Error />;
  }

  const artist = artistData?.artistName?.attributes;
  const artistDataBoilerPlate = artistData?.data?.[0];

  console.log("Details Header Song Data: ", songDataV1);

  return (
    <div className="relative w-full flex flex-col">
      <div className="w-full bg-gradient-to-l from-transpartent to-black sm:h-48 h-28 rounded-2xl " />
      <div className="absolute inset-0 flex items-center ml-2">
        {/* Artist Image */}
        <img
          className="sm:w-40 w-28 sm:h-40 h:28 rounded-full object-cover border-2 shadow-xl"
          src={
            artistId
              ? artistDataBoilerPlate?.attributes?.artwork?.url
              : songDataV1?.images?.coverart
          }
          alt=""
        />
        <div className="ml-5">
          {/* Artist Name */}

          <p className="font-bold sm:text-3xl text-xl text-white">
            {artistId
              ? artistDataBoilerPlate?.attributes?.name
              : songDataV1?.title}
          </p>
          {!artistId && (
            <Link to={`/artists/${songDataV1?.artists[0]?.adamid}`}>
              <p className="text-base font-bold text-gray-400 mt-2">
                {songDataV1?.subtitle}
              </p>
            </Link>
          )}

          {/* Genre */}
          <p className="font-bold text-gray-400 mt-2">
            {artistId
              ? artistDataBoilerPlate?.attributes?.genreNames
              : songDataV1?.genres?.primary}
          </p>

          {/* Born */}
          <p className="text-base text-gray-400 mt-2">
            {artistId && artistDataBoilerPlate?.attributes?.origin}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DetailsHeader;
