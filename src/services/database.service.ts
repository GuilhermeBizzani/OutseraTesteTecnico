import { getDataSource, getInitializedDataSource } from '../config/database';
import { Movie } from '../models/Movie';
import { Repository } from 'typeorm';

export interface MovieFilters {
  winner?: boolean;
  year?: number;
}

/**
 * Initialize database (TypeORM will auto-create tables with synchronize: true)
 */
export const initializeDatabase = async (): Promise<void> => {
  await getDataSource();
  console.log('Database tables initialized');
};

/**
 * Get Movie repository
 */
const getMovieRepository = (): Repository<Movie> => {
  const dataSource = getInitializedDataSource();
  return dataSource.getRepository(Movie);
};

export const insertMovie = async (movie: Movie): Promise<Movie> => {
  const repository = getMovieRepository();
  return await repository.save(movie);
};

export const insertMoviesBatch = async (movies: Movie[]): Promise<void> => {
  const repository = getMovieRepository();
  await repository.save(movies);
  console.log(`Inserted ${movies.length} movies into database`);
};

/**
 * Retorna todos os filmes em ordem decrescente por ano
 * Podendo filtrar por winner ou year
 */
export const getMovies = async (filters?: MovieFilters): Promise<Movie[]> => {
  const repository = getMovieRepository();

  const where: any = {};
  if (filters?.winner !== undefined) {
    where.winner = filters.winner;
  }
  if (filters?.year !== undefined) {
    where.year = filters.year;
  }

  return await repository.find({
    where: Object.keys(where).length > 0 ? where : undefined,
    order: {
      year: 'DESC',
      title: 'ASC',
    },
  });
};
