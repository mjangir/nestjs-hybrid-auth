import { Request } from 'express';
import {
  StrategyOption,
  StrategyOptionWithRequest,
  Profile,
} from 'passport-shopify';

type ShopifyAuthStrategyOptionsWithoutRequest = {
  [K in keyof StrategyOption]: StrategyOption[K];
};

type ShopifyAuthStrategyOptionsWithRequest = {
  [K in keyof StrategyOptionWithRequest]: StrategyOptionWithRequest[K];
};

export type ShopifyAuthModuleOptions =
  | ShopifyAuthStrategyOptionsWithoutRequest
  | ShopifyAuthStrategyOptionsWithRequest;

export type ShopifyAuthGuardOptions = Object;

export const shopifyGuardDefaultOptions = {
  scope: ['read_products'],
};

export interface ShopifyAuthModuleOptionsFactory {
  createModuleOptions():
    | Promise<ShopifyAuthModuleOptions>
    | ShopifyAuthModuleOptions;
}

export interface ShopifyAuthResult {
  originalRequest: Request;
  accessToken: string;
  refreshToken: string;
  profile: Profile;
}
