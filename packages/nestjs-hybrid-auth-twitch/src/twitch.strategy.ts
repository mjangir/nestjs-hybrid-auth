import { Injectable, Inject } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-twitch-latest';
import { merge } from 'lodash';
import { TwitchAuthModuleOptions, TwitchAuthResult } from './twitch.types';
import { TWITCH_HYBRID_AUTH_OPTIONS } from './twitch.constants';

@Injectable()
export class TwitchAuthStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(TWITCH_HYBRID_AUTH_OPTIONS)
    options: TwitchAuthModuleOptions
  ) {
    super(
      merge(options, {
        passReqToCallback: true,
      }) as TwitchAuthModuleOptions
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
    } as TwitchAuthResult;
  }
}
