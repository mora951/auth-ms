import { Request, Response } from 'express';
import codes from '../../utils/server-codes';
import { makeError } from '../../errors/errorHandler';
import { getAllUsers as getAllUsersService } from '../../services/user/get';

const { SERVER_ERROR, SUCCESS } = codes;

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const allUsers = await getAllUsersService();

    const formattedUsers = allUsers.map(({ firstName, lastName, email, username }) => ({
      firstName,
      lastName,
      email,
      username,
    }));

    res.statusCode = SUCCESS;
    res.send(formattedUsers);
  } catch (error: any) {
    const errorStatus = error.status || SERVER_ERROR;

    res.statusCode = errorStatus;
    res.send(makeError(error.message, errorStatus));
  }
};

export { getAllUsers };
