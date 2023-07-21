import { PhoneNumber } from 'twilio/lib/interfaces';
import TwilioService from './internals/twilio-service';
import { PhoneOtpParams, SendSMSParams } from './types';
import { VerificationInstance } from 'twilio/lib/rest/verify/v2/service/verification';
import { VerificationCheckInstance } from 'twilio/lib/rest/verify/v2/service/verificationCheck';

export default class SMSService {
  public static async sendSMS(params: SendSMSParams): Promise<void> {
    return TwilioService.sendSMS(params);
  }

  public static async sendOtp(
    phoneNumber: PhoneNumber,
  ): Promise<VerificationInstance> {
    return TwilioService.sendOtp(phoneNumber);
  }

  public static async verifyOtp(
    params: PhoneOtpParams,
  ): Promise<VerificationCheckInstance> {
    return TwilioService.verifyOtp(params);
  }
}
