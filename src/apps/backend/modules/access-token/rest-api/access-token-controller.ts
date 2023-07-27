import { NextFunction, Request, Response } from 'express';

import AccessTokenService from '../access-token-service';
import {
  AccessToken,
  CreateAccessTokenParams,
  CreatePhoneAccessTokenParams,
  PhoneAccountSearchParams,
} from '../types';
import SMSService from '../../communication/sms-service';
import AccountService from '../../account/account-service';

export default class AccessTokenController {
  public static async createAccessToken(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { username, password }: CreateAccessTokenParams =
        req.body as CreateAccessTokenParams;
      const params: CreateAccessTokenParams = { username, password };
      const accessToken = await AccessTokenService.createAccessToken(params);
      res.send(AccessTokenController.serializeAccessTokenAsJSON(accessToken));
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
      const params: PhoneAccountSearchParams = { phoneNumber };
      await AccountService.getAccountByPhone(params);
      await SMSService.sendOtp(phoneNumber);
      res
        .status(201)
        .send(AccessTokenController.serializeSendOtpAsJson(phoneNumber));
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
        res
          .status(201)
          .send(AccessTokenController.serializePhoneAccountAsJSON(phoneNumber));
      } else {
        res.status(422).send(`Incorrect otp try again`);
      }
    } catch (e) {
      next(e);
    }
  }

  public static async createPhoneAccessToken(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { phoneNumber } = req.body as CreatePhoneAccessTokenParams;
      const params = { phoneNumber };

      const accessToken = await AccessTokenService.createPhoneAccessToken(
        params,
      );
      res.send(AccessTokenController.serializeAccessTokenAsJSON(accessToken));
    } catch (e) {
      next(e);
    }
  }

  private static serializePhoneAccountAsJSON(phoneNumber: string): unknown {
    return {
      number: phoneNumber,
      message: `Account verified successfully`,
    };
  }

  private static serializeSendOtpAsJson(phoneNumber: string): unknown {
    return {
      number: phoneNumber,
      message: `message has been sent to ${phoneNumber}`,
    };
  }

  private static serializeAccessTokenAsJSON(accessToken: AccessToken): unknown {
    return {
      accountId: accessToken.accountId,
      expiresAt: accessToken.expiresAt.toUTCString(),
      token: accessToken.token,
    };
  }
}
