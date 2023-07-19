import { Schema, Types } from 'mongoose';

export interface UserInfoDB {
  _id: Types.ObjectId;
  account: Types.ObjectId;
  active: boolean;
  first_name: string;
  last_name: string;
  email: string;
  profile_img: Buffer | null;
}

export interface TaskDB {
  _id: Types.ObjectId;
  account: Types.ObjectId;
  active: boolean;
  name: string;
}

export const userInfoDBSchema: Schema = new Schema<UserInfoDB>(
  {
    active: { type: Boolean, required: true, default: true },
    account: {
      type: Schema.Types.ObjectId,
      ref: 'PhoneAccount',
      index: true,
      required: true,
    },
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    profile_img: { type: Buffer, default: null },
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
  },
);

export const taskDbSchema: Schema = new Schema<TaskDB>(
  {
    active: { type: Boolean, required: true, default: true },
    account: {
      type: Schema.Types.ObjectId,
      ref: 'Account',
      index: true,
      required: true,
    },
    name: {
      type: String,
      index: true,
      required: true,
    },
  },
  {
    collection: 'tasks',
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
  },
);
