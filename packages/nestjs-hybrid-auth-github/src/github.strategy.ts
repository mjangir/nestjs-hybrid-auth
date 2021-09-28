import { Injectable, Inject } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-github';
import { merge } from 'lodash';
import { GithubAuthModuleOptions, GithubAuthResult } from './github.types';
import { GITHUB_HYBRID_AUTH_OPTIONS } from './github.constants';

@Injectable()
export class GithubAuthStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(GITHUB_HYBRID_AUTH_OPTIONS) options: GithubAuthModuleOptions
  ) {
    super(
      merge(options, { passReqToCallback: true }) as GithubAuthModuleOptions
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
    } as GithubAuthResult;
  }
}
