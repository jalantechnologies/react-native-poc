import { PhoneNumber } from 'twilio/lib/interfaces';
import TwilioService from './internals/twilio-service';
import { PhoneOtpParams, SendSMSParams } from './types';

export default class SMSService {
  public static async sendSMS(params: SendSMSParams): Promise<void> {
    return TwilioService.sendSMS(params);
  }

  public static async sendOtp(phoneNumber: PhoneNumber) {
    return TwilioService.sendOtp(phoneNumber);
  }

  public static async verifyOtp(params: PhoneOtpParams) {
    return TwilioService.verifyOtp(params);
  }
}
