export type FetchFunction = (page?: number) => Promise<any>;

export type Movie = {
  id: number;
  title: string;
  backdrop_path: string;
  poster_path: string;
};

export enum CategoryQuery {
  POPULAR = 'popularMovies',
  RATED = 'ratedMovies',
  ACTION = 'actionMovies',
  HORROR = 'horrorMovies',
  ROMANCE = 'romanceMovies',
}
