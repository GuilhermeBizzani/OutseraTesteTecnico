import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Movie } from '../models/Movie';

let dataSource: DataSource | null = null;

/**
 * Get or create TypeORM DataSource
 * Uses in-memory SQLite database
 */
export const getDataSource = async (): Promise<DataSource> => {
  if (!dataSource) {
    dataSource = new DataSource({
      type: 'better-sqlite3',
      database: ':memory:',
      synchronize: true, // Auto-create tables from entities
      logging: false,
      entities: [Movie],
    });

    await dataSource.initialize();
    console.log('In-memory SQLite database initialized with TypeORM');
  }

  return dataSource;
};

/**
 * Get initialized DataSource (throws if not initialized)
 */
export const getInitializedDataSource = (): DataSource => {
  if (!dataSource || !dataSource.isInitialized) {
    throw new Error('DataSource not initialized. Call getDataSource() first.');
  }
  return dataSource;
};

/**
 * Close database connection
 */
export const closeDatabase = async (): Promise<void> => {
  if (dataSource && dataSource.isInitialized) {
    await dataSource.destroy();
    dataSource = null;
    console.log('Database connection closed');
  }
};
