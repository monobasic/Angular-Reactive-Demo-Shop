import * as passport from 'passport';
import { Strategy } from 'passport-local';
import * as mongoose from 'mongoose';
import { userSchema } from '../model/user.model';

const User = mongoose.model('User', userSchema);

passport.use(
  new Strategy(
    { usernameField: 'email' },
    async (username, password, done) => {
      try {
        const user = await User.findOne({ email: username }).exec();
        if (!user) {
          return done(null, false, {
            message: 'User not found'
          });
        }
        if (!user.schema.methods.validPassword(password)) {
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
