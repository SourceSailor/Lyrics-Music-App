import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import PlayPause from "./PlayPause";
import { playPause, setActiveSong } from "../redux/features/playerSlice";
import { useGetTopChartsQuery } from "../redux/services/shazamCore";

import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper";
import "swiper/css";
import "swiper/css/free-mode";

// Top Charts Card Component
const TopChartCard = ({
  song,
  i,
  isPlaying,
  activeSong,
  handlePauseClick,
  handlePlayClick,
}) => {
  // Top Charts Song Data Console Log

  // console.log(
  //   "Song Data Coming From Top Card Component In Top Play Component: ",
  //   song
  // );

  return (
    <div className="w-full flex flex-row items-center hover:bg-[#4c426e] py-2 p-4 rounded-lg cursor-pointer mb-2">
      {/* Number Count */}
      <h3 className="font-bold text-base text-white mr-3">{i + 1}.</h3>

      {/* Top Plays Song Image */}
      <div className="flex-1 flex flex-row justify-between items-center">
        <img
          className="w-20 h-20 rounded-lg"
          src={song?.attributes?.artwork?.url}
          alt={song?.attributes?.name}
        />

        {/* Top Plays Song Name */}
        <div className="flex-1 flex flex-col justify-center mx-3">
          <Link to={`/songs/${song?.id}`}>
            <p className="text-xl font-bold text-white">
              {song?.attributes?.name}
            </p>
          </Link>

          {/* Top Plays Song Artist */}
          <Link to={`/songs/${song.attributes?.artistName}`}>
            <p className="text-base text-gray-300 mt-1">
              {song?.attributes?.artistName}
            </p>
          </Link>
        </div>
      </div>

      {/* Top Plays Play Pause Component */}
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

const TopPlay = () => {
  const divRef = useRef(null);
  const dispatch = useDispatch();
  const { data, error } = useGetTopChartsQuery();
  const { activeSong, isPlaying } = useSelector((state) => state.player);

  // Scroll to the top of the page
  useEffect(() => {
    setTimeout(() => {
      divRef.current.scrollIntoView({ top: 0, behavior: "smooth" });
    }, 3000);
  });

  // Top 5 Songs Being Displayed
  const topPlays = data?.slice(0, 5);

  // Handle Pause Function
  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  // Handle Play Function
  const handlePlayClick = (song, i) => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };
  return (
    <div
      ref={divRef}
      className="xl:ml-6 ml-0 xl:mb:0 mb-6 flex-1 xl:max-w-[500px] max-w-full flex flex-col"
    >
      {/* Top  Charts*/}
      <div className="w-full flex flex-col">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-white font-bold text-2xl">Top Charts</h2>
          <Link to={"/top-charts"}>
            <p className="text-gray-300 text-base cursor-pointer">See More</p>
          </Link>
        </div>
        <div className="mt-4 flex flex-col gap-1">
          {topPlays?.map((song, i) => (
            <TopChartCard
              key={i}
              song={song}
              i={i}
              isPlaying={isPlaying}
              activeSong={activeSong}
              handlePauseClick={handlePauseClick}
              handlePlayClick={() => handlePlayClick(song, i)}
            />
          ))}
        </div>
      </div>

      {/* Top Artists */}
      <div className="flex flex-col w-full mt-8">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-white font-bold text-2xl">Top Artists</h2>
          <Link to={"/top-charts"}>
            <p className="text-gray-300 text-base cursor-pointer">See More</p>
          </Link>
        </div>

        {/* Swiper Feature */}
        <Swiper
          slidesPerView="auto"
          spaceBetween={15}
          freeMode={true}
          centeredSlidesBounds
          modules={[FreeMode]}
          className="mt-4"
        >
          {topPlays?.map((song, i) => (
            <SwiperSlide
              key={i}
              style={{ width: "25%", height: "auto" }}
              className="shadow-lg rounded-full animate-slideright"
            >
              <Link to={"/artists"}>
                <img
                  className="rounded-full w-full object-cover"
                  src={song?.attributes?.artwork?.url}
                  alt={song?.attributes?.name}
                />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default TopPlay;
