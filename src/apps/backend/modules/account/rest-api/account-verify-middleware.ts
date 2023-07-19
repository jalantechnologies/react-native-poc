import { NextFunction, Request, Response } from 'express';
import SMSService from '../../communication/sms-service';
export default class AccountVerifyMiddleware {
  public static async verifyAccount(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { phoneNumber, otp } = req.body;
      const params = { phoneNumber, otp };
      const response = await SMSService.verifyOtp(params);

      if (response.status === 'approved') {
        res.locals.phoneNumber = phoneNumber; // Store the phoneNumber in res.locals to access it in the subsequent middleware or route handler
        next();
      } else {
        res.status(422).send(`Incorrect OTP, please try again`);
      }
    } catch (e) {
      next(e);
    }
  }
}
