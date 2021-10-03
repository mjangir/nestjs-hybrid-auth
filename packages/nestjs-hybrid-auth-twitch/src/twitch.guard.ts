import { Injectable, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { merge } from 'lodash';
import {
  TwitchAuthGuardOptions,
  twitchGuardDefaultOptions,
} from './twitch.types';

@Injectable()
class TwitchAuthGuard extends AuthGuard('twitch') {
  constructor(options?: TwitchAuthGuardOptions) {
    super(
      merge(twitchGuardDefaultOptions, options, {
        property: 'hybridAuthResult',
      })
    );
  }
}

export function UseTwitchAuth(options?: TwitchAuthGuardOptions) {
  return UseGuards(new TwitchAuthGuard(options));
}
