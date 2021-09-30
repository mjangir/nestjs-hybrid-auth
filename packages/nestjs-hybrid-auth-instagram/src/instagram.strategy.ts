import { Injectable, Inject } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-instagram';
import { merge } from 'lodash';
import {
  InstagramAuthModuleOptions,
  InstagramAuthResult,
} from './instagram.types';
import { INSTAGRAM_HYBRID_AUTH_OPTIONS } from './instagram.constants';

@Injectable()
export class InstagramAuthStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(INSTAGRAM_HYBRID_AUTH_OPTIONS) options: InstagramAuthModuleOptions
  ) {
    super(
      merge(options, { passReqToCallback: true }) as InstagramAuthModuleOptions
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
    } as InstagramAuthResult;
  }
}
