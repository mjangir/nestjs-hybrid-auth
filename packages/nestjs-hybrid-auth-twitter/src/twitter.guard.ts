import { Injectable, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { merge } from 'lodash';
import {
  TwitterAuthGuardOptions,
  twitterGuardDefaultOptions,
} from './twitter.types';

@Injectable()
class TwitterAuthGuard extends AuthGuard('twitter') {
  constructor(options?: TwitterAuthGuardOptions) {
    super(
      merge(twitterGuardDefaultOptions, options, {
        property: 'hybridAuthResult',
      })
    );
  }
}

export function UseTwitterAuth(options?: TwitterAuthGuardOptions) {
  return UseGuards(new TwitterAuthGuard(options));
}
