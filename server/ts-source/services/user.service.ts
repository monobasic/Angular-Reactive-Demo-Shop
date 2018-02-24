import { UserModel } from '../model/user.model';

export const save = (user) => {
  return user.save();
};

export const findOne = (id) => {
  return UserModel.findOne(id).exec();
};

export default {
  save,
  findOne,
};
