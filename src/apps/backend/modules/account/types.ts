/* eslint-disable max-classes-per-file */
import AppError from '../error/app-error';

export class Account {
  id: string;

  username: string;

  hashedPassword: string;
}

export class PhoneAccount {
  id: string;
  phoneNumber: string;
}

export type CreateAccountParams = {
  username: string;
  password: string;
};

//TODO:
export type PhoneNumber = {
  phoneNumber: string;
};

//TODO:
export type CreatephoneOtpParams = {
  phoneNumber: PhoneNumber;
  otp: number;
};

export type AccountSearchParams = {
  username: string;
  password: string;
};

export enum AccountErrorCode {
  USERNAME_ALREADY_EXISTS = 'ACCOUNT_ERR_01',
  NOT_FOUND = 'ACCOUNT_ERR_02',
  INVALID_CREDENTIALS = 'ACCOUNT_ERR_03',
}

export class AccountWithUserNameExistsError extends AppError {
  code: AccountErrorCode;

  constructor(username: string) {
    super(`An account with username ${username} already exists.`);
    this.code = AccountErrorCode.USERNAME_ALREADY_EXISTS;
    this.httpStatusCode = 409;
  }
}

export class AccountWithPhoneNumberExistsError extends AppError {
  code: AccountErrorCode;

  constructor(phoneNumber: string) {
    super(`An account with username ${phoneNumber} already exists`);
    this.code = AccountErrorCode.USERNAME_ALREADY_EXISTS;
    this.httpStatusCode = 409;
  }
}

export class AccountNotFoundError extends AppError {
  code: AccountErrorCode;

  constructor(username: string) {
    super(`${username} not found with provided parameters.`);
    this.code = AccountErrorCode.NOT_FOUND;
    this.httpStatusCode = 404;
  }
}

export class PhoneAccountNotFoundError extends AppError {
  code: AccountErrorCode;

  constructor(phoneNumber: string) {
    super(`${phoneNumber} number not found.`);
    this.code = AccountErrorCode.NOT_FOUND;
    this.httpStatusCode = 404;
  }
}

export class InvalidCredentialsError extends AppError {
  code: AccountErrorCode;

  constructor(username: string) {
    super(`Invalid credentials for ${username}. Please try again.`);
    this.code = AccountErrorCode.NOT_FOUND;
    this.httpStatusCode = 401;
  }
}
