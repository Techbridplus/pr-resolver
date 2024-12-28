import mongoose, { Document, Model, Schema } from 'mongoose';

// Define the User interface
interface User extends Document {
  name: string | undefined;
  email: string | undefined;
  emailVerified: boolean;
  password: string | undefined;
  role: 'admin' | 'user';
  username: string | undefined;
  avatar: string | undefined;
  token: string | undefined;
  githubId: string | undefined;
  accessToken: string | undefined;
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
    unique : true,
    required: [true, 'Email is required'],
    match: [/.+\@.+\..+/, 'Please use a valid email address'],
  },
  emailVerified: {
    type: Boolean,
    default: false,
  },
  username: {
    type: String,
  },
  password: {
    type: String,
    required: true,
    default: null,
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user',
  },
  avatar: {
    type: String,
    default:null,
  },
  token: {
    type: String,
    default: null,
  },
  githubId: {
    type: String,
    default: null,
  },
  accessToken: {
    type: String,
    default: null,
  },
}, {
  timestamps: true,
});

// Create the User model
const UserModel: Model<User> = mongoose.models.User || mongoose.model<User>('User', UserSchema);

export default UserModel;