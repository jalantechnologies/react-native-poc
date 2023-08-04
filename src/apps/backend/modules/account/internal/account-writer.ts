/* eslint-disable no-useless-catch */
import { Account, CreateAccountParams, PhoneAccount } from '../types';

import AccountReader from './account-reader';
import AccountUtil from './account-util';
import AccountRepository from './store/account-repository';

export default class AccountWriter {
  public static async createAccount(
    params: CreateAccountParams,
  ): Promise<Account> {
    await AccountReader.checkUsernameNotExists(params);
    const hashedPassword = await AccountUtil.hashPassword(params.password);
    const dbAccount = await AccountRepository.accountDB.create({
      username: params.username,
      hashedPassword,
      active: true,
    });
    return AccountUtil.convertAccountDBToAccount(dbAccount);
  }

  public static async createAccountWithPhoneNumber(phoneNumber:string): Promise<PhoneAccount> {
    await AccountReader.checkPhoneNumberNotExists(phoneNumber);
    // got the phone number and make entry to monogo
    const dbAccount = await AccountRepository.phoneAccountDB.create({
      phoneNumber: phoneNumber,
      active: true,
    });

    return AccountUtil.convertPhoneAccountDBToAccount(dbAccount);
  }
}
