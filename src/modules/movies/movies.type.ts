export interface MediaDetail {
  genres: Array<{ name: string }>; //{ name: string }[]
  id: number;
  media_type: "movie" | "tv";
  overview: string;
  poster_path: string;
  release_date: string;
  title: string;
  vote_average: number;
}
