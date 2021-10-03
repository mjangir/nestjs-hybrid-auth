import { TwitchAuthStrategy } from './twitch.strategy';
import { TwitchAuthModuleOptions } from './twitch.types';
import { TWITCH_HYBRID_AUTH_OPTIONS } from './twitch.constants';
import {
  createHybridAuthModule,
  INestHybridAuthModule,
} from '@nestjs-hybrid-auth/core';

export const TwitchAuthModule: INestHybridAuthModule<TwitchAuthModuleOptions> =
  createHybridAuthModule<TwitchAuthModuleOptions>(
    TWITCH_HYBRID_AUTH_OPTIONS,
    TwitchAuthStrategy
  );
