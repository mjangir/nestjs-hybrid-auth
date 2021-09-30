import { Injectable, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { merge } from 'lodash';
import {
  InstagramAuthGuardOptions,
  instagramGuardDefaultOptions,
} from './instagram.types';

@Injectable()
class InstagramAuthGuard extends AuthGuard('instagram') {
  constructor(options?: InstagramAuthGuardOptions) {
    super(
      merge(instagramGuardDefaultOptions, options, {
        property: 'hybridAuthResult',
      })
    );
  }
}

export function UseInstagramAuth(options?: InstagramAuthGuardOptions) {
  return UseGuards(new InstagramAuthGuard(options));
}
