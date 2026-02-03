import { getMovies } from './database.service';
import { Movie } from '../models/Movie';

interface ProducerWin {
  producer: string;
  year: number;
}

interface ProducerInterval {
  producer: string;
  interval: number;
  previousWin: number;
  followingWin: number;
}

interface ProducerIntervalsResult {
  min: ProducerInterval[];
  max: ProducerInterval[];
}

/**
 * Formata os producers de um filme
 * Retorna um array de string com o nome de cada producer
 */
const parseProducers = (producersString: string): string[] => {
  // Substitui " and " por ", " para realizar apenas um split
  const normalized = producersString.replace(/ and /g, ', ');

  return normalized
    .split(',')
    .map(name => name.trim())
    .filter(name => name.length > 0);
};

/**
 * Retorna cada producer e o ano que venceu o premio
 */
const getProducerWins = async (): Promise<ProducerWin[]> => {
  const movies = await getMovies({ winner: true });
  const producerWins: ProducerWin[] = [];

  for (const movie of movies) {
    const producers = parseProducers(movie.producers);

    for (const producer of producers) {
      producerWins.push({
        producer,
        year: movie.year,
      });
    }
  }

  // ordena pelo nome do producer e ano das vitorias para facilitar a comparação
  return producerWins.sort((a, b) => {
    if (a.producer !== b.producer) {
      return a.producer.localeCompare(b.producer);
    }
    return a.year - b.year;
  });
};

/**
 * Calcula os intervalos entre os premios consecutivos
 */
const calculateProducerIntervals = (wins: ProducerWin[]): ProducerInterval[] => {
  const intervals: ProducerInterval[] = [];
  const producerWinsMap = new Map<string, number[]>();

  // agrupa os producers em um Map
  for (const win of wins) {
    if (!producerWinsMap.has(win.producer)) {
      producerWinsMap.set(win.producer, []);
    }
    producerWinsMap.get(win.producer)!.push(win.year);
  }

  // calcula cada intervalo de tempo entre as vitorias de um mesmo producer
  for (const [producer, years] of producerWinsMap.entries()) {
    if (years.length < 2) {
      continue;
    }

    for (let i = 1; i < years.length; i++) {
      const previousWin = years[i - 1];
      const followingWin = years[i];
      const interval = followingWin - previousWin;

      intervals.push({
        producer,
        interval,
        previousWin,
        followingWin,
      });
    }
  }

  return intervals;
};

/**
 * Busca os producers com min e max intervalos de vitorias
 */
export const getProducersWithMinMaxIntervals = async (): Promise<ProducerIntervalsResult> => {
  const wins = await getProducerWins();

  const intervals = calculateProducerIntervals(wins);

  if (intervals.length === 0) {
    return { min: [], max: [] };
  }

  // coleta os interavlos minimos e maximos
  const minInterval = Math.min(...intervals.map(i => i.interval));
  const maxInterval = Math.max(...intervals.map(i => i.interval));

  // retorna todas as correspondencias para cada intervalo
  return {
    min: intervals.filter(i => i.interval === minInterval),
    max: intervals.filter(i => i.interval === maxInterval),
  };
};

/**
 * Get all movies
 */
export const getAllMovies = async (): Promise<Movie[]> => {
  return await getMovies();
};
