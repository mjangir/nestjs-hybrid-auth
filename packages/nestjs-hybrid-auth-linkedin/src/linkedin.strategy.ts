import { Injectable, Inject } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-linkedin-oauth2';
import { merge } from 'lodash';
import {
  LinkedinAuthModuleOptions,
  LinkedinAuthResult,
} from './linkedin.types';
import { LINKEDIN_HYBRID_AUTH_OPTIONS } from './linkedin.constants';

@Injectable()
export class LinkedinAuthStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(LINKEDIN_HYBRID_AUTH_OPTIONS)
    options: LinkedinAuthModuleOptions
  ) {
    super(
      merge(options, {
        passReqToCallback: true,
      }) as LinkedinAuthModuleOptions
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
    } as LinkedinAuthResult;
  }
}
