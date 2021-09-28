import { Module, Global, DynamicModule, Provider, Type } from '@nestjs/common';
import {
  GoogleAuthModule,
  GoogleAuthModuleOptions,
} from '@nestjs-hybrid-auth/google';
import {
  TwitterAuthModule,
  TwitterAuthModuleOptions,
} from '@nestjs-hybrid-auth/twitter';
import {
  LinkedinAuthModule,
  LinkedinAuthModuleOptions,
} from '@nestjs-hybrid-auth/linkedin';
import {
  FacebookAuthModule,
  FacebookAuthModuleOptions,
} from '@nestjs-hybrid-auth/facebook';
import {
  GithubAuthModule,
  GithubAuthModuleOptions,
} from '@nestjs-hybrid-auth/github';
import {
  HybridAuthModuleOptions,
  HybridAuthModuleAsyncOptions,
  HybridAuthOptionsFactory,
} from './hybrid-auth.options';

const providerToken = 'HYBRID_AUTH_CONFIG_SERVICE';

function createHybridAuthImports(options: HybridAuthModuleOptions): any {
  return [
    GoogleAuthModule.forRoot(options.google),
    TwitterAuthModule.forRoot(options.twitter),
    LinkedinAuthModule.forRoot(options.linkedin),
    FacebookAuthModule.forRoot(options.facebook),
    GithubAuthModule.forRoot(options.github),
  ];
}

@Global()
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
    return {
      global: true,
      module: HybridAuthModule,
      providers: [...this.createAsyncProviders(options)],
      exports: [providerToken],
      imports: [
        FacebookAuthModule.forRootAsync({
          useFactory: (config): FacebookAuthModuleOptions => config.facebook,
          inject: [providerToken],
        }),
        GoogleAuthModule.forRootAsync({
          useFactory: (config): GoogleAuthModuleOptions => config.google,
          inject: [providerToken],
        }),
        TwitterAuthModule.forRootAsync({
          useFactory: (config): TwitterAuthModuleOptions => config.twitter,
          inject: [providerToken],
        }),
        LinkedinAuthModule.forRootAsync({
          useFactory: (config): LinkedinAuthModuleOptions => config.linkedin,
          inject: [providerToken],
        }),
        GithubAuthModule.forRootAsync({
          useFactory: (config): GithubAuthModuleOptions => config.github,
          inject: [providerToken],
        }),
      ],
    };
  }

  private static createAsyncProviders(
    options: HybridAuthModuleAsyncOptions
  ): Provider[] {
    if (options.useExisting || options.useFactory) {
      return [this.createAsyncOptionsProvider(options)];
    }
    const useClass = options.useClass as Type<HybridAuthOptionsFactory>;
    return [
      this.createAsyncOptionsProvider(options),
      {
        provide: useClass,
        useClass,
      },
    ];
  }

  private static createAsyncOptionsProvider(
    options: HybridAuthModuleAsyncOptions
  ): Provider {
    if (options.useFactory) {
      return {
        provide: providerToken,
        useFactory: options.useFactory,
        inject: options.inject || [],
      };
    }

    const inject = [
      (options.useClass ||
        options.useExisting) as Type<HybridAuthOptionsFactory>,
    ];

    return {
      provide: providerToken,
      useFactory: async (optionsFactory: HybridAuthOptionsFactory) =>
        await optionsFactory.createHybridAuthOptions(),
      inject,
    };
  }
}
