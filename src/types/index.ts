export type FetchFunction = (page?: number) => Promise<any>;
export type SearchFunction = (keyword: string) => Promise<any>;

export type Movie = {
  id: number;
  title: string;
  overview: string;
  backdrop_path: string;
  poster_path: string;
  vote_average: number;
};

export enum CategoryQuery {
  POPULAR = 'popularMovies',
  RATED = 'ratedMovies',
  ACTION = 'actionMovies',
  HORROR = 'horrorMovies',
  ROMANCE = 'romanceMovies',
  SEARCH = 'searchMovie',
}
