import * as mongoose from 'mongoose';
import { UserModel } from '../model/user.model';

export const adminAuth = async (req, res) => {
  // If no user ID exists in the JWT return a 401
  if (!req.payload._id) {
    res.status(401).json({
      message: 'UnauthorizedError: private profile'
    });
  } else {
    // Otherwise continue
    const user = await UserModel.findById(req.payload._id).exec();
    if (user) {
      res.status(200).json({ auth: true });
    }
  }
};
