import fs from 'fs';
import path from 'path';
import { getDataSource, closeDatabase } from '../../src/config/database';
import { insertMoviesBatch } from '../../src/services/database.service';
import { Movie } from '../../src/models/Movie';
import { SERVER_ROOT } from '../../src/constants';
import { parseCSV } from '../../src/services/csv.service';

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

export const getMoviesFromCSVFile = (csvFileName: string = 'Movielist.csv'): Movie[] => {
  const csvPath = path.join(SERVER_ROOT, 'data', csvFileName);

  if (!fs.existsSync(csvPath)) {
    throw new Error(`CSV file not found at: ${csvPath}`);
  }

  console.log(`Reading CSV file from: ${csvPath}`);

  const movies = parseCSV(csvPath);

  console.log(`Parsed ${movies.length} movies from CSV`);

  return movies;
}
