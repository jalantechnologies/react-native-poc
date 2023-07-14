import { Twilio } from 'twilio';
import { VerificationInstance } from 'twilio/lib/rest/verify/v2/service/verification';
import { VerificationCheckInstance } from 'twilio/lib/rest/verify/v2/service/verificationCheck';

import ConfigService from '../../config/config-service';
import Logger from '../../logger/logger';
import { SendSMSParams, ThirdPartyServiceError } from '../types';

import SMSParams from './twilio-params';

export default class TwilioService {
  private static twilio: Twilio;

  public static initializeService(): void {
    this.twilio = new Twilio(
      ConfigService.getStringValue('twilio.verify.accountSid'),
      ConfigService.getStringValue('twilio.verify.authToken'),
    );
  }

  public static async sendSMS(params: SendSMSParams): Promise<void> {
    SMSParams.validate(params);

    try {
      await this.twilio.messages.create({
        to: SMSParams.phoneNumberToString(params.recipientPhone),
        messagingServiceSid: ConfigService.getStringValue(
          'twilio.messaging.messagingServiceSid',
        ),
        body: params.messageBody,
      });
    } catch (e) {
      if (
        e.code === 21705 || // If messaging service sid is invalid
        e.code === 20429 || // Too many requests
        e.code === 20003 || // If Twilio account balance runs out.
        e.code === 30002 // If twilio account suspended
      ) {
        Logger.error(e.message);
      }
      throw new ThirdPartyServiceError('SMS service unavailable.');
    }
  }

  public static async sendOtp(phoneNumber): Promise<VerificationInstance> {
    try {
      return await this.twilio.verify.v2
        .services(ConfigService.getStringValue('twilio.verify.verifySid'))
        .verifications.create({ to: phoneNumber, channel: 'sms' });
    } catch (e) {
      Logger.error(e.message);
      throw new ThirdPartyServiceError('SMS service unavailable.');
    }
  }

  public static async verifyOtp(params): Promise<VerificationCheckInstance> {
    const { phoneNumber, otp } = params;

    try {
      return await this.twilio.verify.v2
        .services(ConfigService.getStringValue('twilio.verify.verifySid'))
        .verificationChecks.create({
          to: phoneNumber,
          code: otp,
        });
    } catch (e) {
      Logger.error(e.message);
      throw new ThirdPartyServiceError('SMS service unavailable.');
    }
  }
}
