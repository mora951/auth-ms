import jwt, { Secret, SignOptions } from 'jsonwebtoken';

const generateToken = (userData: { [key: string]: any }): string => {
  const { JWT_SECRET, JWT_EXPIRES_IN } = process.env;

  const { id, username } = userData;

  const options = {
    expiresIn: JWT_EXPIRES_IN,
  };

  const token = jwt.sign({ id, username }, <Secret>JWT_SECRET, <SignOptions>options);

  return token;
};

export { generateToken };
