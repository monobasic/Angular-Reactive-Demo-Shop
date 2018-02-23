import * as passport from 'passport';
import * as mongoose from 'mongoose';
import { UserModel } from '../model/user.model';
import { save } from '../services/user.service';

export const registerUser = async (req, res, next) => {
  try {
    const user = new UserModel({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      permissions: req.body.permissions
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

export const loginUser = (req, res, next) => {
  passport.authenticate('local', function(err, user, info) {
    let token;
    console.log(user);
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

export const getProfile = async (req, res, next) => {
  // If no user ID exists in the JWT return a 401
  if (!req.user._id) {
    res.status(401).json({
      message: 'UnauthorizedError: private profile'
    });
  } else {
    // Otherwise continue
    const user = await UserModel.findById(req.user._id).exec();
    if (user) {
      res.status(200).json({
        auth: true,
        user: {
          _id: user.id,
          adresses: user.adresses,
          orders: user.orders,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email
        }
      });
    }
  }
};

export const updateUser = (req, res, next) => {
  res.json({ message: 'update User', payload: req.payload });
  res.end();
};

export const deleteUser = (req, res, next) => {
  res.json({ message: 'delete User', payload: req.payload });
  res.end();
};
