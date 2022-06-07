import React, { useState, useMemo } from 'react';
import { Movie } from 'types';

type SetMovie = React.Dispatch<React.SetStateAction<Movie | null>>;

const MovieContext = React.createContext<{ movie: Movie | null; setMovie: SetMovie } | undefined>(undefined);

const MovieContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [movie, setMovie] = useState<Movie | null>(null);

  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const value = { movie, setMovie };
  return <MovieContext.Provider value={value}>{children}</MovieContext.Provider>;
};

const useMovie = () => {
  const context = React.useContext(MovieContext);
  if (context === undefined) {
    throw new Error('useCount must be used within a CountProvider');
  }
  return context;
};

export { MovieContextProvider, useMovie };
