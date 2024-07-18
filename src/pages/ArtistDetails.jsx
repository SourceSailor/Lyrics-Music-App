import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { DetailsHeader, Error, Loader } from "../components";
import { useGetArtistsDetailsQuery } from "../redux/services/shazamCore";
import { Link } from "react-router-dom";
import PlayPause from "../components/PlayPause";
import { playPause, setActiveSong } from "../redux/features/playerSlice";

// Swiper Import
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper";
import "swiper/css";
import "swiper/css/free-mode";

// Artist Details Component
const ArtistDetails = ({ delay }) => {
  const { id: artistId } = useParams();
  const dispatch = useDispatch();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const [delayed, setDelayed] = useState(false);

  // Delay API Response
  useEffect(() => {
    const timer = setTimeout(() => {
      setDelayed(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  // Artist Details API Call
  const {
    data: artistData,
    isFetching,
    error,
  } = useGetArtistsDetailsQuery(artistId, {
    skip: !delayed,
  });

  // Handle Play and Pause Clicks
  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = (song, i) => {
    dispatch(
      setActiveSong({ song, data: artistRelatedSongsDataBoilerPlate, i })
    );
    dispatch(playPause(true));
  };

  // API Fetching and Error Handling
  if (isFetching) return <Loader title="Loading artist details..." />;
  if (error) {
    console.log("Artists Details Error: ", error);
    return <Error />;
  }

  // Artist Data Boilerplate Variables
  const artistDataBoilerPlate = artistData?.data?.[0];
  const artistRelatedSongsDataBoilerPlate =
    artistData?.data?.[0]?.views["top-songs"]?.data;
  const relatedArtistsDataBoilerPlate =
    artistData?.data?.[0]?.views["similar-artists"]?.data;

  const parseItalicText = (text) => {
    const parts = text.split(/(<I>|<\/I>|<i>|<\/i>|\*)/);
    let isItalic = false;

    return parts.map((part, index) => {
      if (part === "<I>" || part === "<i>" || part === "*") {
        isItalic = !isItalic;
        return null;
      } else if (part === "</I>" || part === "</i>") {
        isItalic = false;
        return null;
      } else {
        return isItalic ? <i key={index}>{part}</i> : part;
      }
    });
  };

  return (
    <div className="flex flex-col">
      {/* Artist Details Header */}
      <DetailsHeader artistId={artistId} artistData={artistData} />

      {/* Artist Bio */}
      <div className="mt-10 mb-3">
        <h2 className="text-white text-3xl font-bold">Bio:</h2>
        {artistDataBoilerPlate?.attributes?.artistBio ? (
          <p className="text-white text-lg my-5">
            {parseItalicText(artistDataBoilerPlate.attributes.artistBio)}
          </p>
        ) : (
          <p className="text-white text-xl mt-5">Sorry, no bio found...</p>
        )}
      </div>

      {/* Related Artists */}
      <div className="mt-7">
        <h2 className="text-white text-3xl font-bold">Related Artists</h2>

        {/* Related Artists Swiper Feature */}
        <Swiper
          slidesPerView="auto"
          spaceBetween={15}
          freeMode={true}
          centeredSlidesBounds
          modules={[FreeMode]}
          className="mt-4"
        >
          {relatedArtistsDataBoilerPlate?.map((artist, i) => (
            <SwiperSlide
              key={i}
              style={{ width: "20%", height: "auto" }}
              className="shadow-lg rounded-full animate-slideright"
            >
              <div className="relative group">
                <p
                  style={{ textShadow: "black 2px 3px" }}
                  className="absolute bottom-0 left-0 text-xl font-bold text-white pl-3 pb-3 z-10 group-hover:opacity-100 transition-opacity duration-300 ease-in-out"
                >
                  {artist?.attributes?.name}
                </p>
                <Link to={`/artists/${artist?.id}`} className="block">
                  <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition-opacity duration-300 ease-in-out"></div>
                  <img
                    className="rounded-2xl w-full object-cover"
                    src={artist?.attributes?.artwork?.url}
                    alt={artist?.attributes?.name}
                  />
                </Link>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Artists Related Songs */}
      <div className="mt-20 mb-3">
        <h2 className="text-white text-3xl font-bold mb-5">Related Songs:</h2>

        {artistRelatedSongsDataBoilerPlate ? (
          artistRelatedSongsDataBoilerPlate.map((song, i) => (
            <TopArtistRelatedSongs
              key={song.id}
              song={song}
              i={i}
              isPlaying={isPlaying}
              activeSong={activeSong}
              handlePauseClick={handlePauseClick}
              handlePlayClick={() => handlePlayClick(song, i)}
            />
          ))
        ) : (
          <p className="text-white">Sorry, no songs found...</p>
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
      {/* Counter Numeral */}
      <h3 className="font-bold text-base text-white mr-3">{i + 1}.</h3>
      <div className="flex-1 flex flex-row justify-between items-center">
        <img
          className="w-20 h-20 rounded-lg"
          src={song?.attributes?.artwork?.url}
          alt={song?.attributes?.name}
        />

        <div className="flex-1 flex flex-col justify-center mx-3">
          {/* Song Title */}
          <Link to={`/songs/${song?.id}`}>
            <p className="text-xl font-bold text-white">
              {song?.attributes?.name}
            </p>
          </Link>
          {/* Song Artist */}
          <p className="text-base text-gray-300 mt-1">
            {song?.attributes?.artistName}
          </p>
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
