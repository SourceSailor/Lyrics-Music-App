import { useNavigate } from "react-router-dom";

const ArtistCard = ({ track }) => {
  const navigate = useNavigate();
  console.log("Artist Card Track Data: ", track);

  return (
    <div
      className="flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer"
      onClick={() => navigate(`/songs/${track?.id}`)}
    >
      <img
        src={track?.attributes?.artwork?.url}
        alt={`${track?.attributes?.artistName} artwork`}
      />
      <p className="mt-4 font-semibold text-lg text-white truncate">
        {track?.attributes?.artistName}
      </p>
    </div>
  );
};

export default ArtistCard;
