import { Request } from 'express';

import * as PassportOauth2 from 'passport-oauth2';

type Optional<T, K extends keyof T> = Omit<T, K> & Partial<T>;

type StrategyOptions = Optional<
  PassportOauth2.StrategyOptions,
  'authorizationURL' | 'tokenURL'
>;

type StrategyOptionsWithRequest = Optional<
  PassportOauth2.StrategyOptionsWithRequest,
  'authorizationURL' | 'tokenURL'
>;

type TwitchAuthStrategyOptionsWithoutRequest = {
  [K in keyof StrategyOptions]: StrategyOptions[K];
};

type TwitchAuthStrategyOptionsWithRequest = {
  [K in keyof StrategyOptionsWithRequest]: StrategyOptionsWithRequest[K];
};

export type TwitchAuthModuleOptions =
  | TwitchAuthStrategyOptionsWithoutRequest
  | TwitchAuthStrategyOptionsWithRequest;

export type TwitchAuthGuardOptions = Object;

export const twitchGuardDefaultOptions = {
  scope: ['user_read'],
  state: true,
};

export interface TwitchAuthModuleOptionsFactory {
  createModuleOptions():
    | Promise<TwitchAuthModuleOptions>
    | TwitchAuthModuleOptions;
}

interface TwitchProfile {
  broadcaster_type: 'partner' | 'affiliate' | '';
  description: string;
  display_name: string;
  id: string;
  login: string;
  offline_image_url: string;
  profile_image_url: string;
  type: 'staff' | 'admin' | 'global_mod' | '';
  view_count: number;
  email?: string;
  created_at: string;
  provider: string;
}

export interface TwitchAuthResult {
  originalRequest: Request;
  accessToken: string;
  refreshToken: string;
  profile: TwitchProfile;
}
