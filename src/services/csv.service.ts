import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';
import { Movie, MovieDTO } from '../models/Movie';
import { insertMoviesBatch } from './database.service';
import { SERVER_ROOT } from '../constants';

/**
 * Lê o arquivo CSV e converte cada linha em um objeto do tipo Movie
 */
const parseCSV = (filePath: string): Movie[] => {
  const fileContent = fs.readFileSync(filePath, 'utf-8');

  const records = parse(fileContent, {
    columns: true,
    skip_empty_lines: true,
    delimiter: ';',
    trim: true,
  }) as MovieDTO[];

  return records.map(record => ({
    year: parseInt(record.year, 10),
    title: record.title,
    studios: record.studios,
    producers: record.producers,
    winner: record.winner.toLowerCase() === 'yes',
  }));
};

/**
 * Importa os filmes do arquivo CSV para o DB
 */
export const importMoviesFromCSV = async (csvFileName: string = 'Movielist.csv'): Promise<void> => {
  try {
    const csvPath = path.join(SERVER_ROOT, 'data', csvFileName);

    if (!fs.existsSync(csvPath)) {
      throw new Error(`CSV file not found at: ${csvPath}`);
    }

    console.log(`Reading CSV file from: ${csvPath}`);

    const movies = parseCSV(csvPath);

    console.log(`Parsed ${movies.length} movies from CSV`);

    await insertMoviesBatch(movies);

    console.log('Movies imported successfully');
  } catch (error) {
    console.error('Error importing movies from CSV:', error);
    throw error;
  }
};
