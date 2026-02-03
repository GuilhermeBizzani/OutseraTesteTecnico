import { Request, Response } from 'express';
import { getAllMovies, getProducersWithMinMaxIntervals } from '../services/movies.service';

/**
 * Busca todos os filmes
 */
export const getAll = async (req: Request, res: Response): Promise<void> => {
  try {
    const movies = await getAllMovies();

    res.json({
      data: movies,
    });
  } catch (error) {
    console.error('Error fetching movies:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

/**
 * Busca os produtores com menor e maior intervalo de tempo entre vitórias
 */
export const getProducersIntervals = async (req: Request, res: Response): Promise<void> => {
  try {
    const intervals = await getProducersWithMinMaxIntervals();

    res.json(intervals);
  } catch (error) {
    console.error('Error fetching producer intervals:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};
