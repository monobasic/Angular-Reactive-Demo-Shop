import * as express from 'express';
import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.status(200).json('server is up and running');
  res.end();
});

export default router;
