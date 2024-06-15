import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { DetailsHeader, Error, Loader, RelatedSongs } from "../components";
import { useGetArtistsDetailsQuery } from "../redux/services/shazamCore";

const ArtistDetails = ({ delay }) => {
  const { id: artistId } = useParams();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const [delayed, setDelayed] = useState(false);

  // Setting a Timeout to delayed state using a prop from Song Details
  useEffect(() => {
    const timer = setTimeout(() => {
      setDelayed(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  // Creating conditional logic, fetching the data from the API to execute after setDelayed and songid is truthy
  const {
    data: artistData,
    isFetching,
    error,
  } = useGetArtistsDetailsQuery({ artistId }, { skip: !delayed });

  if (isFetching) return <Loader title="Loading artist details..." />;
  if (error) return <Error />;

  return (
    <div className="flex flex-col">
      <DetailsHeader artistId={artistId} artistData={artistData} />
      <div className="mt-10 mb-3">
        <h2 className="text-white text-3xl font-bold">Lyrics:</h2>
      </div>

      {/* Related Songs Component */}
      <RelatedSongs
        delay={3000}
        // data={Object.values(artistData?.song)}
        artistId={artistId}
        isPlaying={isPlaying}
        activeSong={activeSong}
        // handlePlayClick={() => handlePlayClick(song, i)}
      />
    </div>
  );
};

export default ArtistDetails;
