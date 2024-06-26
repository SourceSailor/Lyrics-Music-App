import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";

import { Searchbar, Sidebar, MusicPlayer, TopPlay } from "./components";
import {
  ArtistDetails,
  TopArtists,
  AroundYou,
  Discover,
  Search,
  SongDetails,
  TopCharts,
} from "./pages";

const App = () => {
  const { activeSong } = useSelector((state) => state.player);

  return (
    <div className="relative flex">
      {/* Sidebar */}

      <Sidebar />

      <div className="flex-1 flex flex-col bg-gradient-to-br from-black to-[#121286]">
        {/* Search Bar */}

        <Searchbar />

        <div className="px-6 h-[calc(100vh-72px)] overflow-y-scroll hide-scrollbar flex xl:flex-row flex-col-reverse">
          <div className="flex-1 h-fit pb-40">
            <Routes>
              {/* DISCOVER */}
              <Route path="/" element={<Discover delay={500} />} />

              {/* TOP ARTISTS */}
              <Route path="/top-artists" element={<TopArtists />} />

              {/* TOP CHARTS */}
              <Route path="/top-charts" element={<TopCharts />} />

              {/* AROUND YOU */}
              <Route path="/around-you" element={<AroundYou />} />

              {/* ARTISTS DETAILS */}
              <Route
                path="/artists/:id"
                element={<ArtistDetails delay={1500} />}
              />

              {/* SONG DETAILS */}
              <Route
                path="/songs/:songid"
                element={<SongDetails delay={2000} />}
              />

              {/* SEARCH */}
              <Route path="/search/:searchTerm" element={<Search />} />
            </Routes>
          </div>
          <div className="xl:sticky relative top-0 h-fit">
            {/* TOP PLAYS */}
            <TopPlay delay={0} />
          </div>
        </div>
      </div>

      {activeSong?.attributes?.name && (
        <div className="absolute h-28 bottom-0 left-0 right-0 flex animate-slideup bg-gradient-to-br from-white/10 to-[#2a2a80] backdrop-blur-lg rounded-t-3xl z-10">
          {/* MUSIC PLAYER */}
          <MusicPlayer />
        </div>
      )}
    </div>
  );
};

export default App;
