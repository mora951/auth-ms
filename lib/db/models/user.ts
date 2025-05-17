import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { COLLECTIONS } from '../utils';

const { model, Schema } = mongoose;

const UserSchema = new Schema({
  id: {
    type: String,
    default: uuidv4,
    index: true,
  },
  firstName: String,
  lastName: String,
  email: String,
  username: String,
  password: String,
  otp: String,
  active: { type: Boolean, default: false },
  emailVerified: { type: Boolean, default: false },
  enabled: { type: Boolean, default: true },
});

export default model('User', UserSchema, COLLECTIONS.USERS);
