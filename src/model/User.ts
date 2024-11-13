import mongoose, { Document, Model, Schema } from 'mongoose';

// Define the User interface
interface User extends Document {
  name: string | undefined;
  email: string | undefined;
  password: string | undefined;
  username: string | undefined;
  avatar: string | undefined;
  githubId: string | undefined;
  accessToken: string| undefined;
  createdAt: Date;
}

// Define the User schema
const UserSchema: Schema<User> = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    match: [/.+\@.+\..+/, 'Please use a valid email address'],
  },
  username: {
    type: String,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
  githubId: {
    type: String,
    unique: true,
  },
  accessToken: {
    type: String,
  },
}, {
  timestamps: true,
});

// Create the User model
const UserModel: Model<User> = mongoose.models.User || mongoose.model<User>('User', UserSchema);

export default UserModel;