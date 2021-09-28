import { Injectable, Inject } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-twitter';
import { merge } from 'lodash';
import { TwitterAuthModuleOptions, TwitterAuthResult } from './twitter.types';
import { TWITTER_HYBRID_AUTH_OPTIONS } from './twitter.constants';

@Injectable()
export class TwitterAuthStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(TWITTER_HYBRID_AUTH_OPTIONS) options: TwitterAuthModuleOptions
  ) {
    super(
      merge(options, { passReqToCallback: true }) as TwitterAuthModuleOptions
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
    } as TwitterAuthResult;
  }
}
