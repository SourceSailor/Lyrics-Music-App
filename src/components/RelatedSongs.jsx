import SongBar from "./SongBar";
import { useGetRelatedSongsQuery } from "../redux/services/shazamCore";

const RelatedSongs = ({
  songData,
  isPlaying,
  activeSong,
  handlePauseClick,
  handlePlayClick,
}) => {
  const relatedSongsId = songData?.data[0]?.id;
  const { data: relatedSongData } = useGetRelatedSongsQuery(
    { relatedSongsId },
    {
      skip: !relatedSongsId,
    }
  );

  console.log(
    "Related Song Data Coming From Related Songs Component: ",
    relatedSongData
  );
  return (
    <div className="flex flex-col">
      <h1 className="font-bold text-3xl text-white">Related Songs</h1>
      <div className="mt-6 w-full flex flex-col">
        {relatedSongData?.map((song, i) => (
          <SongBar song={song} i={i} />
        ))}
      </div>
    </div>
  );
};

export default RelatedSongs;
