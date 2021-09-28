import { Injectable, Inject } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-facebook';
import { merge } from 'lodash';
import {
  FacebookAuthModuleOptions,
  FacebookAuthResult,
} from './facebook.types';
import { FACEBOOK_HYBRID_AUTH_OPTIONS } from './facebook.constants';

@Injectable()
export class FacebookAuthStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(FACEBOOK_HYBRID_AUTH_OPTIONS) options: FacebookAuthModuleOptions
  ) {
    super(
      merge(options, {
        passReqToCallback: true,
      }) as FacebookAuthModuleOptions
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
    } as FacebookAuthResult;
  }
}
