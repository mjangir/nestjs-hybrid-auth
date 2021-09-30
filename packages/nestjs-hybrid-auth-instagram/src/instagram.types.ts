import { Request } from 'express';
import {
  StrategyOption,
  StrategyOptionWithRequest,
  Profile,
} from 'passport-instagram';

type InstagramAuthStrategyOptionsWithoutRequest = {
  [K in keyof StrategyOption]: StrategyOption[K];
};

type InstagramAuthStrategyOptionsWithRequest = {
  [K in keyof StrategyOptionWithRequest]: StrategyOptionWithRequest[K];
};

export type InstagramAuthModuleOptions =
  | InstagramAuthStrategyOptionsWithoutRequest
  | InstagramAuthStrategyOptionsWithRequest;

export type InstagramAuthGuardOptions = Object;

export const instagramGuardDefaultOptions = {};

export interface InstagramAuthModuleOptionsFactory {
  createModuleOptions():
    | Promise<InstagramAuthModuleOptions>
    | InstagramAuthModuleOptions;
}

export interface InstagramAuthResult {
  originalRequest: Request;
  accessToken: string;
  refreshToken: string;
  profile: Profile;
}
