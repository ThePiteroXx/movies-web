import { useMovie } from 'context/MovieContext';
import { useQuery } from 'react-query';
import { getPopularMovies } from 'api/api';

import { Movie, CategoryQuery } from 'types';

import Stars from 'components/Stars';

const randomNumber = Math.floor(Math.random() * 20); // page has 20 elements

const Header: React.FC = () => {
  const { data, status } = useQuery([CategoryQuery.POPULAR, 1], async () => getPopularMovies());
  const randomBackgroundColor = data?.results[randomNumber]?.backdrop_path;
  const { movie } = useMovie();
  return (
    <header
      className='relative h-[500px] lg:h-[calc(100vh-100px)] lg:min-h-[800px] w-full bg-center bg-cover'
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
          <div className='p-4 sm:p-8 absolute top-1/2 translate-y-[-50%] z-1 text-white'>
            <h1 className='my-2 sm:my-5 text-3xl sm:text-4xl lg:text-5xl font-extrabold sm:max-w-2xl'>
              {movie?.title || data.results[randomNumber].title}
            </h1>
            <Stars value={movie ? movie.vote_average / 2 : data.results[randomNumber].vote_average / 2} />
            <p className='my-2 sm:my-5 text-sm sm:text-base lg:text-xl text-slate-300 max-w-sm sm:max-w-xl'>
              {movie?.overview || data.results[randomNumber].overview}
            </p>
          </div>
        </>
      )}
    </header>
  );
};

export default Header;
