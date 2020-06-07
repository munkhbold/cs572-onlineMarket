import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  lastname: String,
  firstname: String,
  role: String
});

const Users = model('User', userSchema);
export default Users;