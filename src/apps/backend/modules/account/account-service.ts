// import AccountReader from './internal/account-reader';
import AccountReader from './internal/account-reader';
import AccountWriter from './internal/account-writer';
import { Account, AccountSearchParams, CreateAccountParams, phoneAccountSearchParams } from './types';

export default class AccountService {
  public static async createAccount(
    params: CreateAccountParams,
  ): Promise<Account> {
    return AccountWriter.createAccount(params);
  }

  public static async createAccountWithPhoneNumber(phoneNumber: string) {
    return AccountWriter.createAccountWithPhoneNumber(phoneNumber);
  }

  public static async getAccountByUsernamePassword(
    params: AccountSearchParams,
  ): Promise<Account> {
    return AccountReader.getAccountByUsernamePassword(params);
  }

  public static async getAccountByPhone(params:phoneAccountSearchParams) {
    return AccountReader.getAccountByPhone(params);
  }
}
