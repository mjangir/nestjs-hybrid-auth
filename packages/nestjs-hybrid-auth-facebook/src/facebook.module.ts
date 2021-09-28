import { FacebookAuthStrategy } from './facebook.strategy';
import { FacebookAuthModuleOptions } from './facebook.types';
import { FACEBOOK_HYBRID_AUTH_OPTIONS } from './facebook.constants';
import {
  createHybridAuthModule,
  INestHybridAuthModule,
} from '@nestjs-hybrid-auth/core';

export const FacebookAuthModule: INestHybridAuthModule<FacebookAuthModuleOptions> =
  createHybridAuthModule<FacebookAuthModuleOptions>(
    FACEBOOK_HYBRID_AUTH_OPTIONS,
    FacebookAuthStrategy
  );
