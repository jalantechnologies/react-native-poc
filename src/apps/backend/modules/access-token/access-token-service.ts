import AccessTokenWriter from './internal/access-token-writer';
import {
  AccessToken,
  CreateAccessTokenParams,
  CreatePhoneAccessTokenParams,
} from './types';

export default class AccessTokenService {
  public static async createAccessToken(
    params: CreateAccessTokenParams,
  ): Promise<AccessToken> {
    return AccessTokenWriter.createAccessToken(params);
  }

  public static async createPhoneAccessToken(
    params: CreatePhoneAccessTokenParams,
  ) {
    return AccessTokenWriter.createPhoneAccessToken(params);
  }
}
