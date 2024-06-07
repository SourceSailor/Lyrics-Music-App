import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const shazamCoreAPI = createApi({
  reducerPath: "shazamCoreApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://shazam-core.p.rapidapi.com",
    prepareHeaders: (headers) => {
      headers.set(
        "X-RapidAPI-Key",
        "13de41bf25mshd068898ac63746ep10d0e8jsn3d35426009b6"
      );
      headers.set("X-RapidAPI-Host", "shazam-core.p.rapidapi.com");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getTopCharts: builder.query({
      query: () => "/v1/charts/world?country_code=DZ",
    }),
    getSongDataV1: builder.query({
      query: ({ detailsHeaderId }) =>
        `/v1/tracks/details?track_id=${detailsHeaderId}`,
    }),
    getSongDetailsV2: builder.query({
      query: ({ songid }) => `/v2/tracks/details?track_id=${songid}`,
    }),
    getRelatedSongs: builder.query({
      query: ({ relatedSongsId }) =>
        `/v1/tracks/related?offset=0&track_id=${relatedSongsId}`,
    }),
  }),
});

export const {
  useGetTopChartsQuery,
  useGetSongDataV1Query,
  useGetSongDetailsV2Query,
  useGetRelatedSongsQuery,
} = shazamCoreAPI;
