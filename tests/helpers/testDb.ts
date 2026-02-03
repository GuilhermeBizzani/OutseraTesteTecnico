import { getDataSource, closeDatabase } from '../../src/config/database';
import { insertMoviesBatch } from '../../src/services/database.service';
import { Movie } from '../../src/models/Movie';

export const setupTestDatabase = async (movies?: Movie[]): Promise<void> => {
  // Initialize database
  await getDataSource();

  if (movies && movies.length > 0) {
    await insertMoviesBatch(movies);
  }
};

export const closeTestDatabase = async (): Promise<void> => {
  await closeDatabase();
};

export const getSampleMovies = (): Movie[] => {
  return [
    {
      year: 1980,
      title: 'Can\'t Stop the Music',
      studios: 'Associated Film Distribution',
      producers: 'Allan Carr',
      winner: true,
    },
    {
      year: 1981,
      title: 'Mommie Dearest',
      studios: 'Paramount Pictures',
      producers: 'Frank Yablans',
      winner: true,
    },
    {
      year: 1982,
      title: 'Inchon',
      studios: 'MGM',
      producers: 'Mitsuharu Ishii',
      winner: true,
    },
    {
      year: 1990,
      title: 'The Adventures of Ford Fairlane',
      studios: '20th Century Fox',
      producers: 'Steven Perry and Joel Silver',
      winner: true,
    },
    {
      year: 1991,
      title: 'Hudson Hawk',
      studios: 'TriStar Pictures',
      producers: 'Joel Silver',
      winner: true,
    },
    {
      year: 1999,
      title: 'Wild Wild West',
      studios: 'Warner Bros.',
      producers: 'Jon Peters',
      winner: true,
    },
    {
      year: 2002,
      title: 'Swept Away',
      studios: 'Screen Gems',
      producers: 'Matthew Vaughn',
      winner: true,
    },
    {
      year: 2015,
      title: 'Fantastic Four',
      studios: '20th Century Fox',
      producers: 'Simon Kinberg, Matthew Vaughn, Hutch Parker, Robert Kulzer and Gregory Goodman',
      winner: true,
    },
  ];
};
