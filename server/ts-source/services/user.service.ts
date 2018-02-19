import { UserModel } from '../model/user.model';

export const save = (user) => {
  return user.save()
};
