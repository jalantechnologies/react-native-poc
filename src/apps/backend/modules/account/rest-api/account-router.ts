/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express';

import AccountController from './account-controller';
// import TwilioServiceSelf from '../twilio-service-self';

export default class AccountRouter {
  public static getRoutes(): Router {
    const router = Router();

    router.post('/', AccountController.createAccount);

    router.post('/phone', AccountController.createAccountWithPhoneNumber);

    router.post('/phoneVerify', AccountController.verifyAccountWithPhoneNumber)

    return router;
  }
}
