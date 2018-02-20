import * as express from 'express';
import { Router } from 'express';

import { register } from '../controller/authentication.controller';
const router = Router();

/* GET api listing. */
router.get('/', (req, res) => {
  res.json({'message': 'user works'});
});

router.post('/register', register);

export default router;
