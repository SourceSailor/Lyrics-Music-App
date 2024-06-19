import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { DetailsHeader, Error, Loader, RelatedSongs } from "../components";
import { useGetArtistsDetailsQuery } from "../redux/services/shazamCore";
import { Link } from "react-router-dom";
import PlayPause from "../components/PlayPause";

const ArtistDetails = ({ delay }) => {
  const { id: artistId } = useParams();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const [delayed, setDelayed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDelayed(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  const {
    data: artistData,
    isFetching,
    error,
  } = useGetArtistsDetailsQuery(artistId, {
    skip: !delayed,
  });

  if (isFetching) return <Loader title="Loading artist details..." />;
  if (error) return <Error />;

  const artistDataBoilerPlate = artistData?.data?.[0];
  const artistRelatedSongsDataBoilerPlate =
    artistData?.data?.[0]?.views["top-songs"]?.data;

  return (
    <div className="flex flex-col">
      <DetailsHeader artistId={artistId} artistData={artistData} />
      <div className="mt-10 mb-3">
        <h2 className="text-white text-3xl font-bold">Bio:</h2>
        <p className="text-white text-lg my-5">
          {artistDataBoilerPlate?.attributes?.artistBio}
        </p>
      </div>

      <div className="mt-10 mb-3">
        <h2 className="text-white text-3xl font-bold mb-5">Related Songs:</h2>

        {artistRelatedSongsDataBoilerPlate ? (
          artistRelatedSongsDataBoilerPlate.map((song, i) => (
            <TopArtistRelatedSongs
              key={song.id}
              song={song}
              i={i}
              isPlaying={isPlaying}
              activeSong={activeSong}
              artistId={artistId}
            />
          ))
        ) : (
          <p className="text-white">No songs found.</p>
        )}
      </div>
    </div>
  );
};

const TopArtistRelatedSongs = ({
  song,
  i,
  isPlaying,
  activeSong,
  handlePauseClick,
  handlePlayClick,
}) => {
  return (
    <div className="w-full flex flex-row items-center hover:bg-[#4c426e] py-2 p-4 rounded-lg cursor-pointer mb-2">
      <h3 className="font-bold text-base text-white mr-3">{i + 1}.</h3>
      <div className="flex-1 flex flex-row justify-between items-center">
        <img
          className="w-20 h-20 rounded-lg"
          src={song?.attributes?.artwork?.url}
          alt={song?.attributes?.name}
        />
        <div className="flex-1 flex flex-col justify-center mx-3">
          <Link to={`/songs/${song?.id}`}>
            <p className="text-xl font-bold text-white">
              {song?.attributes?.name}
            </p>
          </Link>
          <Link to={`/artists/${song?.relationships?.artists?.data[0]?.id}`}>
            <p className="text-base text-gray-300 mt-1">
              {song?.attributes?.artistName}
            </p>
          </Link>
        </div>
      </div>
      <PlayPause
        isPlaying={isPlaying}
        activeSong={activeSong}
        song={song}
        handlePause={handlePauseClick}
        handlePlay={handlePlayClick}
      />
    </div>
  );
};

export default ArtistDetails;
