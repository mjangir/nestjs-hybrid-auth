import { Injectable, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { merge } from 'lodash';
import {
  ShopifyAuthGuardOptions,
  shopifyGuardDefaultOptions,
} from './shopify.types';

@Injectable()
class ShopifyAuthGuard extends AuthGuard('shopify') {
  constructor(options?: ShopifyAuthGuardOptions) {
    super(
      merge(shopifyGuardDefaultOptions, options, {
        property: 'hybridAuthResult',
      })
    );
  }
}

export function UseShopifyAuth(options?: ShopifyAuthGuardOptions) {
  return UseGuards(new ShopifyAuthGuard(options));
}
