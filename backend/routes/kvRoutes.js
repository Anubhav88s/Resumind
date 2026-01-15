import express from 'express';
import { list, get, set } from '../controllers/kvController.js';

const router = express.Router();

router.get('/list', list);
router.get('/:key', get);
router.post('/', set);

export default router;
