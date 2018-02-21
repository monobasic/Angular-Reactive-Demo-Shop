import * as  mongoose from 'mongoose';
const User = mongoose.model('User');

export const adminAuth = async (req, res) => {
  // If no user ID exists in the JWT return a 401
  if (!req.payload._id) {
    res.status(401).json({
      message: 'UnauthorizedError: private profile'
    });
  } else {
    // Otherwise continue
    const user = await User.findById(req.payload._id).exec();
    if (user) {
      res.status(200).json({ auth: true});
    }
  }
};
