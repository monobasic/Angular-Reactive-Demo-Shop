import * as express from 'express';
import * as jwt from 'express-jwt';
import { Router } from 'express';
import { adminAuth } from '../controller/admin-auth.controller';
import { register, login } from '../controller/authentication.controller';

const router = Router();

/* GET api listing. */
// router.get('/', (req, res) => {
//   res.json({ message: 'user works' });
// });

const auth = jwt({
  secret: process.env.SECRET,
  userProperty: 'payload'
});

router.post('/register', register);
router.post('/login', login);

/* GET api listing. */
router.get('/', auth, adminAuth);

export default router;
