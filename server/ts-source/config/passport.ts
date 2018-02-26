import * as passport from 'passport';
import * as passportLocal from 'passport-local';
import * as mongoose from 'mongoose';
import { findOne } from '../services/user.service';
import { UserModel } from '../models/user.model';

export const passportConfig = passport.use(
  new passportLocal.Strategy(
    { usernameField: 'email' },
    async (username, password, done) => {
      console.log('passporting');
      try {
        const user = await findOne({ email: username });
        if (!user) {
          return done(null, false, {
            message: 'User not found'
          });
        }
        if (!user.validPassword(password)) {
          return done(null, false, {
            message: 'Password is wrong'
          });
        }
        // If credentials are correct, return the user object
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);
