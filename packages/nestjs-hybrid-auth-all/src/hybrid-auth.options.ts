import { ModuleMetadata, Type } from '@nestjs/common/interfaces';
import { GoogleAuthModuleOptions } from '@nestjs-hybrid-auth/google';
import { TwitterAuthModuleOptions } from '@nestjs-hybrid-auth/twitter';
import { LinkedinAuthModuleOptions } from '@nestjs-hybrid-auth/linkedin';
import { FacebookAuthModuleOptions } from '@nestjs-hybrid-auth/facebook';
import { GithubAuthModuleOptions } from '@nestjs-hybrid-auth/github';

export interface HybridAuthModuleOptions {
  google: GoogleAuthModuleOptions;
  twitter: TwitterAuthModuleOptions;
  linkedin: LinkedinAuthModuleOptions;
  facebook: FacebookAuthModuleOptions;
  github: GithubAuthModuleOptions;
}

export interface HybridAuthOptionsFactory {
  createHybridAuthOptions():
    | Promise<HybridAuthModuleOptions>
    | HybridAuthModuleOptions;
}

export interface HybridAuthModuleAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  name?: string;
  useExisting?: Type<HybridAuthOptionsFactory>;
  useClass?: Type<HybridAuthOptionsFactory>;
  useFactory?: (
    ...args: any[]
  ) => Promise<HybridAuthModuleOptions> | HybridAuthModuleOptions;
  inject?: any[];
}
