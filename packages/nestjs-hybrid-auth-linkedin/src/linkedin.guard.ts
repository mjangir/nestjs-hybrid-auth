import { Injectable, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { merge } from 'lodash';
import {
  LinkedinAuthGuardOptions,
  linkedinGuardDefaultOptions,
} from './linkedin.types';

@Injectable()
class LinkedinAuthGuard extends AuthGuard('linkedin') {
  constructor(options?: LinkedinAuthGuardOptions) {
    super(
      merge(linkedinGuardDefaultOptions, options, {
        property: 'hybridAuthResult',
      })
    );
  }
}

export function UseLinkedinAuth(options?: LinkedinAuthGuardOptions) {
  return UseGuards(new LinkedinAuthGuard(options));
}
