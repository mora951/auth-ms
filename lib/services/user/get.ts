import User from '../../db/models/user';

const checkUserIfAlreadyExistByProperty = async (propertyType: string, propertyValue: any) => {
  const payload = { [propertyType]: propertyValue };

  const users = await User.find(payload).exec();

  return !!users.length;
};

const getUserByProperty = async (propertyType: string, propertyValue: any) => {
  const payload = { [propertyType]: propertyValue };

  const user = await User.findOne(payload).exec();

  return user;
};

const getAllUsers = async () => User.find({}).exec();

export { checkUserIfAlreadyExistByProperty, getUserByProperty, getAllUsers };
