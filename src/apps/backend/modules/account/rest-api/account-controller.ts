import { NextFunction, Request, Response } from 'express';

import AccountService from '../account-service';
import {
  Account,
  CreateAccountParams,
  phoneAccountSearchParams,
} from '../types';
import SMSService from '../../communication/sms-service';
import AccountReader from '../internal/account-reader';

export default class AccountController {
  public static async createAccount(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { username, password }: CreateAccountParams =
        req.body as CreateAccountParams;
      const params: CreateAccountParams = { username, password };
      const account = await AccountService.createAccount(params);
      res.status(201).send(AccountController.serializeAccountAsJSON(account));
    } catch (e) {
      next(e);
    }
  }

  public static async loginWithPhoneNumber(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { phoneNumber } = req.body;
      const params: phoneAccountSearchParams = { phoneNumber };
      await AccountReader.getAccountByPhone(params);
      await SMSService.sendOtp(phoneNumber);
      res.status(201).send(`otp sent to ${phoneNumber}`);
    } catch (e) {
      next(e);
    }
  }

  public static async createAccountWithPhoneNumber(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { phoneNumber } = req.body;
      await AccountReader.checkPhoneNumberNotExists(phoneNumber);
      await SMSService.sendOtp(phoneNumber);
      res.status(201).send(`otp sent to ${phoneNumber}`);
    } catch (e) {
      next(e);
    }
  }

  public static async verifyWithPhoneNumber(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { phoneNumber, otp } = req.body;
      const params = { phoneNumber, otp };
      const response = await SMSService.verifyOtp(params);

      if (response.status === 'approved') {
        res.status(201).send(`verified successfully ${phoneNumber}`);
      } else {
        res.status(422).send(`Incorrect otp try again`);
      }
    } catch (e) {
      next(e);
    }
  }

  public static async verifyCreateAccountWithPhoneNumber(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { phoneNumber, otp } = req.body;
      const params = { phoneNumber, otp };
      const response = await SMSService.verifyOtp(params);

      if (response.status === 'approved') {
        await AccountService.createAccountWithPhoneNumber(phoneNumber);
        res.status(201).send(`verified successfully ${phoneNumber}`);
      } else {
        res.status(422).send(`Incorrect otp try again`);
      }
    } catch (e) {
      next(e);
    }
  }

  private static serializeAccountAsJSON(account: Account): unknown {
    return {
      id: account.id,
      username: account.username,
    };
  }
}
