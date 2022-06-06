import './App.css';
import * as api from 'api/api';
import RowMovies from 'components/RowMovies/RowMovies';
import { CategoryQuery } from 'types';

const App = () => {
  return (
    <div className='app'>
      <section>
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
