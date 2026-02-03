// Jest setup file that runs before all tests

// Set NODE_ENV to test
process.env.NODE_ENV = 'test';

// Increase timeout for database operations
jest.setTimeout(30000);
