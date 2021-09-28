import { Injectable, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { merge } from 'lodash';
import {
  GoogleAuthGuardOptions,
  googleGuardDefaultOptions,
} from './google.types';

@Injectable()
class GoogleAuthGuard extends AuthGuard('google') {
  constructor(options?: GoogleAuthGuardOptions) {
    super(
      merge(googleGuardDefaultOptions, options, {
        property: 'hybridAuthResult',
      })
    );
  }
}

export function UseGoogleAuth(options?: GoogleAuthGuardOptions) {
  return UseGuards(new GoogleAuthGuard(options));
}
