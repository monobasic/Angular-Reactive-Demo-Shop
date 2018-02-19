import * as express from 'express';
import { Router } from 'express';

const router = Router();

/* GET api listing. */
router.get('/', (req, res) => {
  res.json({ 'auth': true });
  res.end();
});

export default router;
