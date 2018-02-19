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
    user.schema.methods.setPassword(req.body.password);

    const savedUser = await save(user);

    const token = savedUser.schema.methods.generateJwt();

    res.status(200);
    res.json({ token });
    res.end();
  } catch (error) {
    res.json(error);
    res.end();
  }
};
