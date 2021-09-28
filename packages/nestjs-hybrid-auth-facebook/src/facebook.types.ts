import { Request } from 'express';
import {
  StrategyOption,
  StrategyOptionWithRequest,
  Profile,
} from 'passport-facebook';

type FacebookAuthStrategyOptionsWithoutRequest = {
  [K in keyof StrategyOption]: StrategyOption[K];
};

type FacebookAuthStrategyOptionsWithRequest = {
  [K in keyof StrategyOptionWithRequest]: StrategyOptionWithRequest[K];
};

export type FacebookAuthModuleOptions =
  | FacebookAuthStrategyOptionsWithoutRequest
  | FacebookAuthStrategyOptionsWithRequest;

export type FacebookAuthGuardOptions = Object;

export const facebookGuardDefaultOptions = {};

export interface FacebookAuthModuleOptionsFactory {
  createModuleOptions():
    | Promise<FacebookAuthModuleOptions>
    | FacebookAuthModuleOptions;
}

export interface FacebookAuthResult {
  originalRequest: Request;
  accessToken: string;
  refreshToken: string;
  profile: Profile;
}
