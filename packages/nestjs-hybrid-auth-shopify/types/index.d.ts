declare module 'passport-shopify' {
  import * as passport from 'passport';
  import * as express from 'express';
  import * as oauth2 from 'passport-oauth2';

  export interface Profile {
    provider: string;
    id: string;
    displayName: string;
    username: string;
    profileURL: string;
    emails: { value: string }[];
    _raw: string;
    _json: string;
  }

  export interface AuthenticateOptions extends passport.AuthenticateOptions {
    shop?: string | undefined;
  }

  export interface StrategyOption {
    clientID: string;
    clientSecret: string;
    callbackURL: string;
    shop: string | undefined;

    authorizationURL?: string | undefined; //
    tokenURL?: string | undefined; //
    profileURL?: string | undefined; //
    userAgent?: string | undefined;
    customHeaders: { [key: string]: string };
    scopeSeparator: string | undefined;
  }

  export interface StrategyOptionWithRequest extends StrategyOption {
    passReqToCallback: true;
  }

  export type VerifyFunction = (
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: (error: any, user?: any, info?: any) => void
  ) => void;

  export type VerifyFunctionWithRequest = (
    req: express.Request,
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: (error: any, user?: any, info?: any) => void
  ) => void;

  export class Strategy implements passport.Strategy {
    constructor(
      options: StrategyOptionWithRequest,
      verify: VerifyFunctionWithRequest
    );
    constructor(options: StrategyOption, verify: VerifyFunction);

    name: string;
    authenticate(req: express.Request, options?: object): void;
  }
}
