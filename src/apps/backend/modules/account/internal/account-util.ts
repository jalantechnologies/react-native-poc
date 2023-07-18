import * as bcrypt from 'bcrypt';

import { Account, PhoneAccount } from '../types';

import { AccountDB, PhoneAccountDB } from './store/account-db';

export default class AccountUtil {
  public static convertAccountDBToAccount(accountDb: AccountDB): Account {
    const account = new Account();
    account.id = accountDb._id.toString();
    account.username = accountDb.username;
    account.hashedPassword = accountDb.hashedPassword;
    return account;
  }

  public static convertPhoneAccountDBToAccount(
    accountDB: PhoneAccountDB,
  ): PhoneAccount {
    const phoneAccount = new PhoneAccount();
    phoneAccount.id = accountDB._id.toString();
    phoneAccount.phoneNumber = accountDB.phoneNumber;

    return phoneAccount;
  }

  public static async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  public static async comparePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }
}
