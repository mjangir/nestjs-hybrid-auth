import { Module, DynamicModule, Provider, Type } from '@nestjs/common';
import { ModuleOptionsFactory, ModuleAsyncOptions } from './types';

export interface INestHybridAuthModule<T> {
  forRoot(options: T): DynamicModule;
  forRootAsync(
    options: ModuleAsyncOptions<ModuleOptionsFactory<T>, T>
  ): DynamicModule;
}

function staticImplements<T>() {
  return <U extends T>(constructor: U) => {
    constructor;
  };
}

export function createHybridAuthModule<T>(
  providerToken: string,
  strategy: any
): INestHybridAuthModule<T> {
  @Module({})
  @staticImplements<INestHybridAuthModule<T>>()
  class NestHybridAuthModule {
    static forRoot(options: T): DynamicModule {
      return {
        module: NestHybridAuthModule,
        providers: [
          {
            provide: providerToken,
            useValue: options,
          },
          strategy,
        ],
      };
    }

    static forRootAsync(
      options: ModuleAsyncOptions<ModuleOptionsFactory<T>, T>
    ): DynamicModule {
      return {
        module: NestHybridAuthModule,
        providers: [...this.createAsyncProviders(options), strategy],
      };
    }

    private static createAsyncProviders(
      options: ModuleAsyncOptions<ModuleOptionsFactory<T>, T>
    ): Provider[] {
      if (options.useExisting || options.useFactory) {
        return [this.createAsyncOptionsProvider(options)];
      }
      const useClass = options.useClass as Type<ModuleOptionsFactory<T>>;
      return [
        this.createAsyncOptionsProvider(options),
        {
          provide: useClass,
          useClass,
        },
      ];
    }

    private static createAsyncOptionsProvider(
      options: ModuleAsyncOptions<ModuleOptionsFactory<T>, T>
    ): Provider {
      if (options.useFactory) {
        return {
          provide: providerToken,
          useFactory: options.useFactory,
          inject: options.inject || [],
        };
      }

      const inject = [
        (options.useClass || options.useExisting) as Type<
          ModuleOptionsFactory<T>
        >,
      ];

      return {
        provide: providerToken,
        useFactory: async (optionsFactory: ModuleOptionsFactory<T>) =>
          await optionsFactory.createModuleOptions(),
        inject,
      };
    }
  }

  return NestHybridAuthModule;
}
