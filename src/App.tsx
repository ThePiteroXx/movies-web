import './App.css';
import * as api from 'api/api';
import { CategoryQuery } from 'types';

import RowMovies from 'components/RowMovies/RowMovies';
import Header from 'components/Header/Header';

const App = () => {
  return (
    <div className='app font-sans'>
      <Header />
      <section className='lg:mt-[-280px]'>
        <RowMovies fetchMovie={api.getPopularMovies} queryKey={CategoryQuery.POPULAR} main />
        <RowMovies fetchMovie={api.getTopRatedMovies} queryKey={CategoryQuery.RATED} title='top rated movies' />
        <RowMovies fetchMovie={api.getActionMovies} queryKey={CategoryQuery.ACTION} title='action movies' />
        <RowMovies fetchMovie={api.getHorrorMovies} queryKey={CategoryQuery.HORROR} title='horror movies' />
        <RowMovies fetchMovie={api.getRomanceMovies} queryKey={CategoryQuery.ROMANCE} title='romance movies' />
      </section>
    </div>
  );
};

export default App;
