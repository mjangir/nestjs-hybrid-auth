import {
  ModuleOptionsFactory as IdentityModuleOptionsFactory,
  ModuleAsyncOptions as IdentityModuleAsyncOptions,
} from '@nestjs-hybrid-auth/core';
import { GoogleAuthModuleOptions } from '@nestjs-hybrid-auth/google';
import { TwitterAuthModuleOptions } from '@nestjs-hybrid-auth/twitter';
import { LinkedinAuthModuleOptions } from '@nestjs-hybrid-auth/linkedin';
import { FacebookAuthModuleOptions } from '@nestjs-hybrid-auth/facebook';
import { InstagramAuthModuleOptions } from '@nestjs-hybrid-auth/instagram';
import { GithubAuthModuleOptions } from '@nestjs-hybrid-auth/github';
import { TwitchAuthModuleOptions } from '@nestjs-hybrid-auth/twitch';
import { ShopifyAuthModuleOptions } from '@nestjs-hybrid-auth/shopify';
import { OktaAuthModuleOptions } from '@nestjs-hybrid-auth/okta';

export interface HybridAuthModuleOptions {
  google?: GoogleAuthModuleOptions;
  twitter?: TwitterAuthModuleOptions;
  linkedin?: LinkedinAuthModuleOptions;
  facebook?: FacebookAuthModuleOptions;
  instagram?: InstagramAuthModuleOptions;
  github?: GithubAuthModuleOptions;
  twitch?: TwitchAuthModuleOptions;
  shopify?: ShopifyAuthModuleOptions;
  okta?: OktaAuthModuleOptions;
}

export interface HybridAuthModuleAsyncOptions {
  google?: IdentityModuleAsyncOptions<
    IdentityModuleOptionsFactory<GoogleAuthModuleOptions>,
    GoogleAuthModuleOptions
  >;
  twitter?: IdentityModuleAsyncOptions<
    IdentityModuleOptionsFactory<TwitterAuthModuleOptions>,
    TwitterAuthModuleOptions
  >;
  linkedin?: IdentityModuleAsyncOptions<
    IdentityModuleOptionsFactory<LinkedinAuthModuleOptions>,
    LinkedinAuthModuleOptions
  >;
  facebook?: IdentityModuleAsyncOptions<
    IdentityModuleOptionsFactory<FacebookAuthModuleOptions>,
    FacebookAuthModuleOptions
  >;
  instagram?: IdentityModuleAsyncOptions<
    IdentityModuleOptionsFactory<InstagramAuthModuleOptions>,
    InstagramAuthModuleOptions
  >;
  github?: IdentityModuleAsyncOptions<
    IdentityModuleOptionsFactory<GithubAuthModuleOptions>,
    GithubAuthModuleOptions
  >;
  twitch?: IdentityModuleAsyncOptions<
    IdentityModuleOptionsFactory<TwitchAuthModuleOptions>,
    TwitchAuthModuleOptions
  >;
  shopify?: IdentityModuleAsyncOptions<
    IdentityModuleOptionsFactory<ShopifyAuthModuleOptions>,
    ShopifyAuthModuleOptions
  >;
  okta?: IdentityModuleAsyncOptions<
    IdentityModuleOptionsFactory<OktaAuthModuleOptions>,
    OktaAuthModuleOptions
  >;
}
