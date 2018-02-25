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

    res.status(200).json({
      success: true,
      token
    });
    res.end();
  } catch (error) {
    res.status(502).json({
      error,
      success: false
    });
    res.end();
  }
};

export const loginUser = (req, res, next) => {
  try {
    passport.authenticate('local', function(err, user, info) {
      let token;
      console.log(user);
      // If Passport throws/catches an error
      if (err) {
        throw new Error('Error in Authentication');
      }

      // If a user is found
      if (user) {
        token = user.generateJwt();
        res.status(200).json({
          success: true,
          token: token,
          message: 'login successful'
        });
      } else {
        // If user is not found
        res.status(401).json(info);
      }
    })(req, res, next);
  } catch (error) {
    res.status(502).json({
      error,
      success: false,
      message: 'Could not login User'
    });
  }
};

export const getProfile = async (req, res, next) => {
  try {
    // If no user ID exists in the JWT return a 401
    if (!req.user._id) {
      throw new Error('UnauthorizedError: private profile');
    }

    const user = await UserModel.findById(req.user._id).exec();

    if (user) {
      res.status(200).json({
        success: true,
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
  } catch (error) {
    res.status(401).json({
      error,
      success: false,
      message: error.message
    });
  }
};

export const updateUser = (req, res, next) => {
  res.status(501).json({
    success: false,
    message: 'update user not implemented',
    payload: req.payload
  });
  res.end();
};

export const deleteUser = (req, res, next) => {
  res.status(501).json({
    success: false,
    message: 'delete user not implemented',
    payload: req.payload
  });
  res.end();
};
