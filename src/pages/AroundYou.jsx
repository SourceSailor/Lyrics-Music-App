import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Error, Loader, SongCard } from "../components";
import { useGetSongsByCountryQuery } from "../redux/services/shazamCore";

const AroundYou = () => {
  const [country, setCountry] = useState("");
  const [loading, setLoading] = useState(true);
  const { activeSong, isPlaying } = useSelector((state) => state.player);

  const { data, isFetching, error } = useGetSongsByCountryQuery(country, {
    skip: !country,
  });

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        "https://geo.ipify.org/api/v2/country?apiKey=at_PDq9PR9ja6EcSbUaFwOJxTYsOVVz0&ipAddress=8.8.8.8"
      )
      .then((res) => setCountry(res?.data?.location?.country))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [country]);

  if (isFetching) return <Loader title="Loading songs around you..." />;
  if (error) {
    console.log("Around You Songs Error: ", error);
    return <Error />;
  }

  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">
        Around You: <span className="font-black">{country}</span>
      </h2>

      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {data?.map((song, i) => (
          <SongCard
            key={i}
            song={song}
            isPlaying={isPlaying}
            activeSong={activeSong}
            i={i}
          />
        ))}
      </div>
    </div>
  );
};

export default AroundYou;
