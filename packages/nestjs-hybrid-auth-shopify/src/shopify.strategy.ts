import { Injectable, Inject } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-shopify';
import { merge } from 'lodash';
import { ShopifyAuthModuleOptions, ShopifyAuthResult } from './shopify.types';
import { SHOPIFY_HYBRID_AUTH_OPTIONS } from './shopify.constants';

@Injectable()
export class ShopifyAuthStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(SHOPIFY_HYBRID_AUTH_OPTIONS)
    options: ShopifyAuthModuleOptions
  ) {
    console.log(options, 'manish');
    super(
      merge(options, {
        passReqToCallback: true,
      }) as ShopifyAuthModuleOptions
    );
  }

  async validate(
    originalRequest: any,
    accessToken: string,
    refreshToken: string,
    profile: any
  ) {
    return {
      originalRequest,
      accessToken,
      refreshToken,
      profile,
    } as ShopifyAuthResult;
  }
}
