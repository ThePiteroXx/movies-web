import React from 'react';
import { Movie } from 'types';

type PropsType = {
  movie: Movie;
  main?: boolean;
};

const MovieItem: React.FC<PropsType> = ({ movie, main }) => {
  return (
    <div
      className={`p-1 sm:p-2 shrink-0 ${
        main ? 'w-1/3 sm:w-1/4 md:w-1/5 lg:w-1/6 xl:w-[12.5%] 2xl:w-[10%]' : 'w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/6'
      } text-slate-400`}
    >
      <img
        draggable='false'
        src={main ? `https://image.tmdb.org/t/p/w300${movie.poster_path}` : `https://image.tmdb.org/t/p/w300${movie.backdrop_path}`}
        alt={movie.title}
        className={`${
          main ? 'aspect-[6/9]' : 'aspect-video'
        } w-full object-contain origin-bottom transition-transform peer hover:cursor-pointer hover:scale-125`}
      />
      <p
        className={`${
          main ? 'hidden' : 'text-xs lg:text-sm 2xl:text-basic'
        } max-w-[90% font-bold transition-color transition-transform peer-hover:scale-110 peer-hover:text-slate-200`}
      >
        {movie.title}
      </p>
    </div>
  );
};

export default MovieItem;
