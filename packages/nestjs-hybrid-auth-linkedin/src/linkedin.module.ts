import { LinkedinAuthStrategy } from './linkedin.strategy';
import { LinkedinAuthModuleOptions } from './linkedin.types';
import { LINKEDIN_HYBRID_AUTH_OPTIONS } from './linkedin.constants';
import {
  createHybridAuthModule,
  INestHybridAuthModule,
} from '@nestjs-hybrid-auth/core';

export const LinkedinAuthModule: INestHybridAuthModule<LinkedinAuthModuleOptions> =
  createHybridAuthModule<LinkedinAuthModuleOptions>(
    LINKEDIN_HYBRID_AUTH_OPTIONS,
    LinkedinAuthStrategy
  );
