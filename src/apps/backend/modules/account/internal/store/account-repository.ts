import mongoose, { CallbackError, Connection } from 'mongoose';

import ConfigService from '../../../config/config-service';

import {
  AccountDB,
  PhoneAccountDB,
  accountDbSchema,
  phoneAccountDbSchema,
} from './account-db';

export default class AccountRepository {
  public static accountDB: mongoose.Model<AccountDB>;
  public static phoneAccountDB: mongoose.Model<PhoneAccountDB>; // to create account with only phone number

  static async createDBConnection(): Promise<Connection> {
    return new Promise((resolve, reject) => {
      const mongoURI = ConfigService.getStringValue('mongoDb.uri');
      mongoose.createConnection(
        mongoURI,
        {},
        (error: CallbackError, result: Connection): void => {
          if (error) {
            reject(error);
          } else {
            AccountRepository.accountDB = result.model(
              'Account',
              accountDbSchema,
            ) as unknown as mongoose.Model<AccountDB>;
            AccountRepository.phoneAccountDB = result.model(
              'PhoneAccount',
              phoneAccountDbSchema,
            ) as mongoose.Model<PhoneAccountDB>;
            resolve(result);
          }
        },
      );
    });
  }
}
