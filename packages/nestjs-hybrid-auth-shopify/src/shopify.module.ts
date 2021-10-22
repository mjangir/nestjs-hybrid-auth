import { ShopifyAuthStrategy } from './shopify.strategy';
import { ShopifyAuthModuleOptions } from './shopify.types';
import { SHOPIFY_HYBRID_AUTH_OPTIONS } from './shopify.constants';
import {
  createHybridAuthModule,
  INestHybridAuthModule,
} from '@nestjs-hybrid-auth/core';

export const ShopifyAuthModule: INestHybridAuthModule<ShopifyAuthModuleOptions> =
  createHybridAuthModule<ShopifyAuthModuleOptions>(
    SHOPIFY_HYBRID_AUTH_OPTIONS,
    ShopifyAuthStrategy
  );
