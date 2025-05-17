import { userFixedProperties } from '../../config/globals';
import User from '../../db/models/user';

const updateUserByUsername: Function = async (
  username: string,
  userData: { [key: string]: any },
): Promise<any> => User.updateOne({ username }, userData);

const removeUserDataByUsername: Function = async (username: string, properties: string[]) => {
  const newProperties = properties.filter((property) => !userFixedProperties.includes(property));

  if (!newProperties.length) {
    console.log('There is no allowed properties that needs removing');
    return;
  }

  const payload: any = {};

  newProperties.forEach((property: string) => {
    payload[property] = '';
  });

  return User.updateOne({ username }, { $unset: payload });
};

export { updateUserByUsername, removeUserDataByUsername };
