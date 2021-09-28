import { Request } from 'express';
import {
  StrategyOption,
  StrategyOptionWithRequest,
  Profile,
} from 'passport-linkedin-oauth2';

type LinkedinAuthStrategyOptionsWithoutRequest = {
  [K in keyof StrategyOption]: StrategyOption[K];
};

type LinkedinAuthStrategyOptionsWithRequest = {
  [K in keyof StrategyOptionWithRequest]: StrategyOptionWithRequest[K];
};

export type LinkedinAuthModuleOptions =
  | LinkedinAuthStrategyOptionsWithoutRequest
  | LinkedinAuthStrategyOptionsWithRequest;

export type LinkedinAuthGuardOptions = Object;

export const linkedinGuardDefaultOptions = {
  scope: ['r_emailaddress', 'r_liteprofile'],
  state: true,
};

export interface LinkedinAuthModuleOptionsFactory {
  createModuleOptions():
    | Promise<LinkedinAuthModuleOptions>
    | LinkedinAuthModuleOptions;
}

export interface LinkedinAuthResult {
  originalRequest: Request;
  accessToken: string;
  refreshToken: string;
  profile: Profile;
}
