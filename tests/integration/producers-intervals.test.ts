import request from 'supertest';
import { app } from '../../src/index';
import { setupTestDatabase, closeTestDatabase, getSampleMovies } from '../helpers/testDb';

describe('GET /movies/producers-intervals', () => {
  beforeAll(async () => {
    // Set up database with sample data
    await setupTestDatabase(getSampleMovies());
  });

  afterAll(async () => {
    // Clean up database
    await closeTestDatabase();
  });

  it('should return intervals with correct structure', async () => {
    const response = await request(app)
      .get('/movies/producers-intervals')
      .expect(200);

    const { min, max } = response.body;

    if (min.length > 0) {
      const minInterval = min[0];
      // valida a existencia de cada atributo dentro do objeto
      expect(minInterval).toHaveProperty('producer');
      expect(minInterval).toHaveProperty('interval');
      expect(minInterval).toHaveProperty('previousWin');
      expect(minInterval).toHaveProperty('followingWin');
    }

    if (max.length > 0) {
      const maxInterval = max[0];
      expect(maxInterval).toHaveProperty('producer');
      expect(maxInterval).toHaveProperty('interval');
      expect(maxInterval).toHaveProperty('previousWin');
      expect(maxInterval).toHaveProperty('followingWin');
    }
  });

  it('should calculate intervals correctly for sample data', async () => {
    const response = await request(app)
      .get('/movies/producers-intervals')
      .expect(200);

    const { min, max } = response.body;

    // Intervalo min deve ser 1 e max deve ser 13
    expect(min[0].interval).toEqual(1);
    expect(max[0].interval).toEqual(13);
  });

  it('should only include producers with multiple wins', async () => {
    const response = await request(app)
      .get('/movies/producers-intervals')
      .expect(200);

    const { min, max } = response.body;

    // Cada produtor nos resultados deve ter os anos de vitoria diferentes em cada intervalo
    [...min, ...max].forEach((interval: any) => {
      expect(interval.previousWin).not.toBe(interval.followingWin);
    });
  });
});

describe('GET /movies/producers-intervals - Edge Cases', () => {
  beforeEach(async () => {
    // Setup database with empty data
    await setupTestDatabase([]);
  });

  afterEach(async () => {
    await closeTestDatabase();
  });

  it('should return empty arrays when no movies exist', async () => {
    const response = await request(app)
      .get('/movies/producers-intervals')
      .expect(200);

    // Não tendo dados no DB, deve retornar este array fixo
    expect(response.body).toEqual({ min: [], max: [] });
  });
});
