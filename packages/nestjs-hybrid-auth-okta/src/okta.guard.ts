import { Injectable, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { merge } from 'lodash';
import { OktaAuthGuardOptions, oktaGuardDefaultOptions } from './okta.types';

@Injectable()
class OktaAuthGuard extends AuthGuard('okta') {
  constructor(options?: OktaAuthGuardOptions) {
    super(
      merge(oktaGuardDefaultOptions, options, {
        property: 'hybridAuthResult',
      })
    );
  }
}

export function UseOktaAuth(options?: OktaAuthGuardOptions) {
  return UseGuards(new OktaAuthGuard(options));
}
