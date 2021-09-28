import { TwitterAuthStrategy } from './twitter.strategy';
import { TwitterAuthModuleOptions } from './twitter.types';
import { TWITTER_HYBRID_AUTH_OPTIONS } from './twitter.constants';
import {
  createHybridAuthModule,
  INestHybridAuthModule,
} from '@nestjs-hybrid-auth/core';

export const TwitterAuthModule: INestHybridAuthModule<TwitterAuthModuleOptions> =
  createHybridAuthModule<TwitterAuthModuleOptions>(
    TWITTER_HYBRID_AUTH_OPTIONS,
    TwitterAuthStrategy
  );
