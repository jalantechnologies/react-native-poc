import ConfigService from '../config/config-service';

export default class TwilioServiceSelf {
  private accountSid: string;
  private authToken: string;
  private static verifySid: string;
  private static client: any; // Type appropriately based on the Twilio library typings

  constructor() {
    this.accountSid = ConfigService.getStringValue('twilio.accountSid');
    this.authToken = ConfigService.getStringValue('twilio.authToken');
    TwilioServiceSelf.verifySid =
      ConfigService.getStringValue('twilio.verifySid');
    TwilioServiceSelf.client = require('twilio')(
      this.accountSid,
      this.authToken,
    );
  }

  public static async sendOtp(phoneNumber): Promise<void> {
    try {
      const sendOtp = await this.client.verify.v2
        .services(this.verifySid)
        .verifications.create({ to: phoneNumber, channel: 'sms' });

      console.log(sendOtp.status);
    } catch (e) {
      console.error('Error sending OTP:', e);
    }
  }

  public static async verifyOtp(params): Promise<void> {
    const { phoneNumber, otp } = params;
    // const phoneNumber = '+918951825195';

    try {
      const verificationCheck = await this.client.verify.v2
        .services(this.verifySid)
        .verificationChecks.create({
          to: phoneNumber,
          code: otp,
        });

      console.log(verificationCheck.status); // Log the verification status
    } catch (error) {
      console.error('Error verifying OTP:', error);
    }
  }
}
