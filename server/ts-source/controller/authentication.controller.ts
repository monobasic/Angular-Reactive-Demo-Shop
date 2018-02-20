import * as passport from 'passport';
import * as mongoose from 'mongoose';
import { UserModel } from '../model/user.model';
import { save } from '../services/user.service';

export const register = async (req, res, next) => {
  try {
    const user = new UserModel({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email
    });
    user.setPassword(req.body.password);

    const savedUser = await save(user);

    const token = savedUser.generateJwt();

    res.status(200);
    res.json({ token });
    res.end();
  } catch (error) {
    res.json(error);
    res.end();
  }
};

export const login = (req, res, next) => {
  passport.authenticate('local', function(err, user, info) {
    let token;

    // If Passport throws/catches an error
    if (err) {
      console.log('error in authentication');
      res.status(404).json(err);
      return;
    }

    // If a user is found
    if (user) {
      token = user.generateJwt();
      res.status(200);
      res.json({
        token: token
      });
    } else {
      // If user is not found
      res.status(401).json(info);
    }
  })(req, res, next);
};
