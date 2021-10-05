import { Request } from 'express';
import { OktaStrategyOptions, OktaProfile } from 'passport-okta-oauth20';

export type OktaAuthModuleOptions = OktaStrategyOptions;

export type OktaAuthGuardOptions = Object;

export const oktaGuardDefaultOptions = {};

export interface OktaAuthModuleOptionsFactory {
  createModuleOptions(): Promise<OktaAuthModuleOptions> | OktaAuthModuleOptions;
}

export interface OktaAuthResult {
  originalRequest: Request;
  accessToken: string;
  refreshToken: string;
  profile: OktaProfile;
}
