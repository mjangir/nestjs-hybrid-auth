import { Request } from 'express';
import {
  IStrategyOption,
  IStrategyOptionWithRequest,
  Profile,
} from 'passport-twitter';

type TwitterAuthStrategyOptionsWithoutRequest = {
  [K in keyof IStrategyOption]: IStrategyOption[K];
};

type TwitterAuthStrategyOptionsWithRequest = {
  [K in keyof IStrategyOptionWithRequest]: IStrategyOptionWithRequest[K];
};

export type TwitterAuthModuleOptions =
  | TwitterAuthStrategyOptionsWithoutRequest
  | TwitterAuthStrategyOptionsWithRequest;

export type TwitterAuthGuardOptions = Object;

export const twitterGuardDefaultOptions = {};

export interface TwitterAuthModuleOptionsFactory {
  createModuleOptions():
    | Promise<TwitterAuthModuleOptions>
    | TwitterAuthModuleOptions;
}

export interface TwitterAuthResult {
  originalRequest: Request;
  accessToken: string;
  refreshToken: string;
  profile: Profile;
}
