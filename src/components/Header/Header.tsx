import { useMovie } from 'context/MovieContext';
import { useQuery } from 'react-query';
import { getPopularMovies } from 'api/api';

import { Movie, CategoryQuery } from 'types';

import Stars from 'components/Header/Stars';

const MOVIE_RANDOM_NUMBER = Math.floor(Math.random() * 20); // page has 20 elements

const Header: React.FC = () => {
  const { data, status } = useQuery([CategoryQuery.POPULAR, 1], async () => getPopularMovies());
  const randomBackgroundColor = data?.results[MOVIE_RANDOM_NUMBER]?.backdrop_path;
  const { movie } = useMovie();
  return (
    <header
      id='header'
      className='relative h-[500px] lg:h-[calc(100vh-100px)] lg:min-h-[750px] w-full bg-center bg-cover'
      style={{
        backgroundImage: `url(${
          movie ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}` : data && `https://image.tmdb.org/t/p/original${randomBackgroundColor}`
        })`,
      }}
    >
      {status === 'success' && (
        <>
          <div className='absolute top-0 left-0 w-full h-full bg-black/[.4] -z-1' />
          <div className='absolute left-0 bottom-0 w-full h-8 lg:h-14 bg-gradient-to-t from-[#232e2e] z-0' />
          <div className='p-4 sm:p-8 lg:pt-36 absolute top-1/2 lg:top-0 translate-y-[-50%] lg:translate-y-0 z-1 text-white'>
            <h1 className='my-2 sm:my-5 text-3xl sm:text-4xl lg:text-5xl font-extrabold sm:max-w-2xl'>
              {movie?.title || data.results[MOVIE_RANDOM_NUMBER].title}
            </h1>
            <Stars value={movie ? movie.vote_average / 2 : data.results[MOVIE_RANDOM_NUMBER].vote_average / 2} />
            <p className='my-2 sm:my-5 text-sm sm:text-base lg:text-xl text-slate-300 max-w-sm sm:max-w-xl'>
              {movie?.overview || data.results[MOVIE_RANDOM_NUMBER].overview}
            </p>
          </div>
        </>
      )}
    </header>
  );
};

export default Header;
