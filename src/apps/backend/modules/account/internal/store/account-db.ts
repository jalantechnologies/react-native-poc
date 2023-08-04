import { Schema, Types } from 'mongoose';

export interface AccountDB {
  _id: Types.ObjectId;
  active: boolean;
  username: string;
  hashedPassword: string;
}

export interface PhoneAccountDB {
  _id: Types.ObjectId;
  active: boolean;
  phoneNumber: string;
}

export const accountDbSchema: Schema = new Schema<AccountDB>(
  {
    active: { type: Boolean, required: true },
    hashedPassword: { type: String, required: true },
    username: {
      type: String,
      index: true,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
  },
);

export const phoneAccountDbSchema: Schema = new Schema<PhoneAccountDB>(
  {
    active: { type: Boolean, required: true },
    phoneNumber: { type: String, required: true, index: true, unique: true },
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
  },
);
