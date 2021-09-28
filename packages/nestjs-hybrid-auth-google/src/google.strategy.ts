import { Injectable, Inject } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';
import { merge } from 'lodash';
import { GoogleAuthModuleOptions, GoogleAuthResult } from './google.types';
import { GOOGLE_HYBRID_AUTH_OPTIONS } from './google.constants';

@Injectable()
export class GoogleAuthStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(GOOGLE_HYBRID_AUTH_OPTIONS) options: GoogleAuthModuleOptions
  ) {
    super(
      merge(options, { passReqToCallback: true }) as GoogleAuthModuleOptions
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
    } as GoogleAuthResult;
  }
}
