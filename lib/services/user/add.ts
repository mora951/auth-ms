import User from '../../db/models/user';

const addUser: Function = async (userData: { [key: string]: any }): Promise<any> => {
  const { firstName, lastName, email, username, hashedPassword, otp } = userData;

  return User.create({ firstName, lastName, email, username, password: hashedPassword, otp });
};

export { addUser };
