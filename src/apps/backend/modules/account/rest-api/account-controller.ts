import { NextFunction, Request, Response } from 'express';

import AccountService from '../account-service';
import { Account, CreateAccountParams, PhoneAccount } from '../types';
import SMSService from '../../communication/sms-service';

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

  public static async createAccountWithPhoneNumber(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { phoneNumber } = req.body;
      await AccountService.checkPhoneNumberNotExists(phoneNumber);
      await SMSService.sendOtp(phoneNumber);
      res
        .status(201)
        .send(AccountController.serializeSendOtpAsJson(phoneNumber));
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
        const phoneAccount = await AccountService.createAccountWithPhoneNumber(
          phoneNumber,
        );
        res
          .status(201)
          .send(AccountController.serializePhoneAccountAsJSON(phoneAccount));
      } else {
        res.status(422).send(`Incorrect otp try again`);
      }
    } catch (e) {
      next(e);
    }
  }

  private static serializePhoneAccountAsJSON(
    PhoneAccount: PhoneAccount,
  ): unknown {
    return {
      id: PhoneAccount.id,
      number: PhoneAccount.phoneNumber,
      message: `Account created successfully`,
    };
  }

  private static serializeSendOtpAsJson(phoneNumber: string): unknown {
    return {
      message: `message has been sent to ${phoneNumber}`,
    };
  }

  private static serializeAccountAsJSON(account: Account): unknown {
    return {
      id: account.id,
      username: account.username,
    };
  }
}
