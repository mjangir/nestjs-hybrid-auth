import { Request } from 'express';
import {
  StrategyOptions,
  StrategyOptionsWithRequest,
  AuthenticateOptionsGoogle,
  Profile,
} from 'passport-google-oauth20';

type GoogleAuthStrategyOptionsWithoutRequest = {
  [K in keyof StrategyOptions]: StrategyOptions[K];
};

type GoogleAuthStrategyOptionsWithRequest = {
  [K in keyof StrategyOptionsWithRequest]: StrategyOptionsWithRequest[K];
};

export type GoogleAuthModuleOptions =
  | GoogleAuthStrategyOptionsWithoutRequest
  | GoogleAuthStrategyOptionsWithRequest;

export type GoogleAuthGuardOptions = {
  [K in keyof AuthenticateOptionsGoogle]: AuthenticateOptionsGoogle[K];
};

export const googleGuardDefaultOptions = {
  scope: ['profile', 'email'],
  accessType: 'offline',
};

export interface GoogleAuthModuleOptionsFactory {
  createModuleOptions():
    | Promise<GoogleAuthModuleOptions>
    | GoogleAuthModuleOptions;
}

export interface GoogleAuthResult {
  originalRequest: Request;
  accessToken: string;
  refreshToken: string;
  profile: Profile;
}
