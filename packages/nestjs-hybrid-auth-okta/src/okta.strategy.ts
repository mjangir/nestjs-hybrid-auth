import { Injectable, Inject } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-okta-oauth20';
import { merge } from 'lodash';
import { OktaAuthModuleOptions, OktaAuthResult } from './okta.types';
import { OKTA_HYBRID_AUTH_OPTIONS } from './okta.constants';

@Injectable()
export class OktaAuthStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(OKTA_HYBRID_AUTH_OPTIONS)
    options: OktaAuthModuleOptions
  ) {
    super(
      merge(options, {
        passReqToCallback: true,
      }) as OktaAuthModuleOptions
    );
  }

  async validate(
    originalRequest: any,
    accessToken: string,
    refreshToken: string,
    profile: any
  ) {
    return {
      originalRequest,
      accessToken,
      refreshToken,
      profile,
    } as OktaAuthResult;
  }
}
