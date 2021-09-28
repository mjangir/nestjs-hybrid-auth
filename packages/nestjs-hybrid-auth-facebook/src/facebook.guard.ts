import { Injectable, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { merge } from 'lodash';
import {
  FacebookAuthGuardOptions,
  facebookGuardDefaultOptions,
} from './facebook.types';

@Injectable()
class FacebookAuthGuard extends AuthGuard('facebook') {
  constructor(options?: FacebookAuthGuardOptions) {
    super(
      merge(facebookGuardDefaultOptions, options, {
        property: 'hybridAuthResult',
      })
    );
  }
}

export function UseFacebookAuth(options?: FacebookAuthGuardOptions) {
  return UseGuards(new FacebookAuthGuard(options));
}
