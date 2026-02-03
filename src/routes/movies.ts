import express from 'express';
import {
  getAll,
  getProducersIntervals,
} from '../controllers/movies.controller';

const router = express.Router();

router.get('/', getAll);
router.get('/producers-intervals', getProducersIntervals);

export default router;
