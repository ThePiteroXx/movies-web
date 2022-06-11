import { useRef, useState } from 'react';
import { useQuery } from 'react-query';
import { motion } from 'framer-motion';

import { FetchFunction, Movie, CategoryQuery } from 'types';

import { ReactComponent as Arrow } from 'assets/icons/arrow.svg';
import MovieItem from './MovieItem';
import SkeletonSlider from './SkeletonSlider';

type RowMovie = {
  fetchMovie: FetchFunction;
  queryKey: CategoryQuery;
  title?: string;
  main?: boolean;
};

let PADDING_SLIDER = 20; // one side padding of the slider (w-[calc(100%-40px)])

if (window.innerWidth > 640) {
  PADDING_SLIDER = 30;
} else if (window.innerWidth > 768) {
  PADDING_SLIDER = 40;
}

const RowMovies: React.FC<RowMovie> = ({ fetchMovie, queryKey, title, main }) => {
  const [page, setPage] = useState(1);
  const { data, status } = useQuery([queryKey, page], async () => fetchMovie(page));
  const slider = useRef<HTMLDivElement>(null);
  const [sliderPosition, setSliderPosition] = useState(0);
  const [completeAnimation, setCompleteAnimation] = useState<boolean>(true);

  const nextPage = (previousPage?: true) => {
    if (previousPage && page > 1) setPage(page - 1);
    if (previousPage && page === 1) setPage(5);
    if (!previousPage && page < 5) setPage(page + 1);
    if (!previousPage && page === 5) setPage(1);
  };

  const handleClickArrow = (direction: 'left' | 'right') => {
    if (slider.current && completeAnimation) {
      const firstMovieItemDOM = slider.current.children[0];
      const lastMovieItemDOM = slider.current.children[slider.current.children.length - 1];
      const firstMovieRect = firstMovieItemDOM.getBoundingClientRect();
      const lastMovieRect = lastMovieItemDOM.getBoundingClientRect();
      const widthSlider = slider.current.offsetWidth;
      const distanceLastElement = Math.round(lastMovieRect.right) - widthSlider - PADDING_SLIDER; // distance to last movie

      if (direction === 'right') {
        // check if movieItems contain in slider view
        if (lastMovieRect.right <= widthSlider * 2) {
          // if distance to last movie is less than 5 (is affected by screen size) set slider to start position
          if (distanceLastElement < 5) {
            setSliderPosition(0);
            nextPage();
          } else {
            setSliderPosition((prev) => (prev -= distanceLastElement));
          }
        } else {
          setSliderPosition((prev) => (prev -= widthSlider));
        }
      }

      if (direction === 'left') {
        if (Math.abs(firstMovieRect.left) <= widthSlider) {
          // check if movieItem is at the beginning position
          if (Math.round(firstMovieRect.left) - PADDING_SLIDER === 0) {
            setSliderPosition((prev) => (prev -= distanceLastElement)); // set slider to last movie
            nextPage(true);
          } else {
            setSliderPosition(0); // set slider to first movie
          }
        } else {
          setSliderPosition((prev) => (prev += widthSlider));
        }
      }
    }
  };

  return (
    <div className={`my-5 overflow-hidden ${main && 'lg:my-10'}`}>
      <strong className={`${main ? 'text-2xl' : 'text-xl'} ml-[28px] self-start text-zinc-200 capitalize`}>{title}</strong>
      <div className='relative flex justify-center group'>
        <span
          style={{ width: `${PADDING_SLIDER}px` }}
          onClick={() => handleClickArrow('left')}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleClickArrow('left');
          }}
          role='button'
          tabIndex={0}
          className='min-h-max flex justify-center items-center z-10 focus:opacity-100 lg:opacity-0 lg:group-hover:opacity-100 lg:transition-opacity'
        >
          <Arrow className='w-full h-[60px]' />
        </span>
        {status === 'loading' && <SkeletonSlider main={main} />}
        {status === 'success' && (
          <motion.div
            style={{ width: `calc(100% - ${PADDING_SLIDER * 2}px)` }}
            className={`flex ${main ? 'items-center' : 'mt-8 flex-start'}`}
            animate={{ x: `${sliderPosition}px` }}
            ref={slider}
            onAnimationStart={() => setCompleteAnimation(false)}
            onAnimationComplete={() => setCompleteAnimation(true)}
          >
            {status === 'success' && data.results.map((movie: Movie) => <MovieItem key={movie.id} movie={movie} main={main} />)}
          </motion.div>
        )}

        <span
          style={{ width: `${PADDING_SLIDER}px` }}
          onClick={() => handleClickArrow('right')}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleClickArrow('right');
          }}
          role='button'
          tabIndex={0}
          className='min-h-max flex justify-center items-center z-10 focus:opacity-100 lg:opacity-0 lg:group-hover:opacity-100 lg:transition-opacity'
        >
          <Arrow className='rotate-180 w-full h-[60px]' />
        </span>
      </div>
    </div>
  );
};

export default RowMovies;
