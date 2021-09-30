# NestJS Hybrid Auth All In One

Implement various social identity provider authentication in your NestJS application for e.g. Google, Facebook, Twitter and many more.

## Install

```bash
npm install @nestjs-hybrid-auth/all --save
```

OR

```bash
yarn add @nestjs-hybrid-auth/all
```

## How To Use?

This package is an assembling of all the individual nestjs hybrid auth provider packages and exports one single [dynamic nestjs module](https://docs.nestjs.com/fundamentals/dynamic-modules). The module takes configuration for all social providers both synchronously and asynchronously using `forRoot` and `forRootAsync` static methods.

## Example Code For app.module.ts

### Simple static configuration

If you have all of your social providers credentials and configuration handy in an object, just pass them in `.forRoot` static method to register the module. The options object is type of `HybridAuthModuleOptions`.

```typescript
import { HybridAuthModule } from '@nestjs-hybrid-auth/all';

@Module({
  imports: [
    HybridAuthModule.forRoot({
      google: {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL,
      },
      facebook: {
        clientID: process.env.FACEBOOK_CLIENT_ID,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL: process.env.FACEBOOK_CALLBACK_URL,
      },
      // Rest of the providers
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

## Got Async Config For Each Provider?

If you get the configurations for each identity provider asynchronously through any config service or so, use `forRootAsync` static method to load them. The options would be same but value for each provider would be their AsyncOptions equivalent. Please refer to below code:

### Example `useFactory`

```typescript
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  HybridAuthModule,
  FacebookAuthModuleOptions,
} from '@nestjs-hybrid-auth/all';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      expandVariables: true,
    }),
    HybridAuthModule.forRootAsync({
      facebook: {
        useFactory: (
          configService: ConfigService
        ): FacebookAuthModuleOptions => ({
          clientID: configService.get('FACEBOOK_CLIENT_ID'),
          clientSecret: configService.get('FACEBOOK_CLIENT_SECRET'),
          callbackURL: configService.get('FACEBOOK_CALLBACK_URL'),
        }),
        inject: [ConfigService],
      },
      // Rest of the providers
    }),
  ],
})
export class AllAsyncFactoryModule {}
```

### Example `useClass`

```typescript
import { Module, Injectable } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  HybridAuthModule,
  FacebookAuthModuleOptions,
  FacebookAuthModuleOptionsFactory,
} from '@nestjs-hybrid-auth/all';

// We create a config provider class for useClass
@Injectable()
export class FacebookAuthConfig implements FacebookAuthModuleOptionsFactory {
  constructor(private configService: ConfigService) {}

  createModuleOptions(): FacebookAuthModuleOptions {
    return {
      clientID: this.configService.get('FACEBOOK_CLIENT_ID'),
      clientSecret: this.configService.get('FACEBOOK_CLIENT_SECRET'),
      callbackURL: this.configService.get('FACEBOOK_CALLBACK_URL'),
    };
  }
}

// Actual app module
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      expandVariables: true,
    }),
    HybridAuthModule.forRootAsync({
      facebook: {
        useClass: FacebookAuthConfig,
      },
      // Rest of the providers
    }),
  ],
})
export class AllAsyncClassModule {}
```

## Exports For Controller File

`@nestjs-hybrid-auth/all` just re-exports all the authentication route guards and result interfaces from all the individual identity providers. For more information, you can check the documentation for any provider for e.g.`@nestjs-hybrid-auth/google`.

## Have Issues?

If you still have trouble setting up the workflow properly, please file an issue at [Issues](https://github.com/mjangir/nestjs-hybrid-auth/issues) page.

## Maintainers

[Manish Jangir](https://github.com/mjangir)
