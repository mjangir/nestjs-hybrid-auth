import { Module, DynamicModule } from '@nestjs/common';
import { GoogleAuthModule } from '@nestjs-hybrid-auth/google';
import { TwitterAuthModule } from '@nestjs-hybrid-auth/twitter';
import { LinkedinAuthModule } from '@nestjs-hybrid-auth/linkedin';
import { FacebookAuthModule } from '@nestjs-hybrid-auth/facebook';
import { InstagramAuthModule } from '@nestjs-hybrid-auth/instagram';
import { GithubAuthModule } from '@nestjs-hybrid-auth/github';
import { TwitchAuthModule } from '@nestjs-hybrid-auth/twitch';
import { OktaAuthModule } from '@nestjs-hybrid-auth/okta';
import {
  HybridAuthModuleOptions,
  HybridAuthModuleAsyncOptions,
} from './hybrid-auth.options';

function createHybridAuthImports(options: HybridAuthModuleOptions): any {
  return [
    options.google && GoogleAuthModule.forRoot(options.google),
    options.twitter && TwitterAuthModule.forRoot(options.twitter),
    options.linkedin && LinkedinAuthModule.forRoot(options.linkedin),
    options.facebook && FacebookAuthModule.forRoot(options.facebook),
    options.instagram && InstagramAuthModule.forRoot(options.instagram),
    options.github && GithubAuthModule.forRoot(options.github),
    options.twitch && TwitchAuthModule.forRoot(options.twitch),
    options.okta && OktaAuthModule.forRoot(options.okta),
  ].filter(Boolean);
}

@Module({})
export class HybridAuthModule {
  static forRoot(options: HybridAuthModuleOptions): DynamicModule {
    return {
      global: true,
      module: HybridAuthModule,
      imports: createHybridAuthImports(options),
    };
  }

  static forRootAsync(options: HybridAuthModuleAsyncOptions): DynamicModule {
    const imports: any[] = [];

    if (options.facebook) {
      imports.push(FacebookAuthModule.forRootAsync(options.facebook));
    }

    if (options.google) {
      imports.push(GoogleAuthModule.forRootAsync(options.google));
    }

    if (options.github) {
      imports.push(GithubAuthModule.forRootAsync(options.github));
    }

    if (options.linkedin) {
      imports.push(LinkedinAuthModule.forRootAsync(options.linkedin));
    }

    if (options.twitter) {
      imports.push(TwitterAuthModule.forRootAsync(options.twitter));
    }

    if (options.instagram) {
      imports.push(InstagramAuthModule.forRootAsync(options.instagram));
    }

    if (options.twitch) {
      imports.push(TwitchAuthModule.forRootAsync(options.twitch));
    }

    if (options.okta) {
      imports.push(OktaAuthModule.forRootAsync(options.okta));
    }

    return {
      module: HybridAuthModule,
      imports,
    };
  }
}
