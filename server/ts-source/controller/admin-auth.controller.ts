import * as mongoose from 'mongoose';
import { UserModel } from '../model/user.model';

export const adminAuth = async (req, res) => {
  // If no user ID exists in the JWT return a 401
  if (!req.user._id) {
    res.status(401).json({
      message: 'UnauthorizedError: private profile',
      auth: false
    });
  } else {
    // Otherwise continue
    const user = await UserModel.findById(req.user._id).exec();
    if (user) {
      res.status(200).json({
        message: 'success',
        auth: true
      });
    }
  }
};
