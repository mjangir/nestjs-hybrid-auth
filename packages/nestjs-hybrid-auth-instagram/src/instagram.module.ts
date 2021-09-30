import { InstagramAuthStrategy } from './instagram.strategy';
import { InstagramAuthModuleOptions } from './instagram.types';
import { INSTAGRAM_HYBRID_AUTH_OPTIONS } from './instagram.constants';
import {
  createHybridAuthModule,
  INestHybridAuthModule,
} from '@nestjs-hybrid-auth/core';

export const InstagramAuthModule: INestHybridAuthModule<InstagramAuthModuleOptions> =
  createHybridAuthModule<InstagramAuthModuleOptions>(
    INSTAGRAM_HYBRID_AUTH_OPTIONS,
    InstagramAuthStrategy
  );
