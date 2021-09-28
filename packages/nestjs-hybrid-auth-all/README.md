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

### `useFactory` to get the ConfigService injected.

If you want to make use of nest's [ConfigModule](https://docs.nestjs.com/techniques/configuration#installation) to get the auth configuration for all the providers from a `.env` config file, use `forRootAsync` static method. The options to this method are typeof `HybridAuthModuleAsyncOptions` which accepts a `useFactory` property. `useFactory` is a function which gets the instances injected whatever has been provided in `inject` array. You can use those instances to prepare and return the actual `HybridAuthModuleOptions` object. ConfigService can be one of them as per your choice.

```typescript
import { HybridAuthModule } from '@nestjs-hybrid-auth/all';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      expandVariables: true,
    }),
    HybridAuthModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        google: {
          clientID: configService.get('GOOGLE_CLIENT_ID'),
          clientSecret: configService.get('GOOGLE_CLIENT_SECRET'),
          callbackURL: configService.get('GOOGLE_CALLBACK_URL'),
        },
        facebook: {
          clientID: configService.get('FACEBOOK_CLIENT_ID'),
          clientSecret: configService.get('FACEBOOK_CLIENT_SECRET'),
          callbackURL: configService.get('FACEBOOK_CALLBACK_URL'),
        },
        // Rest of the providers
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

### Use `useClass` to get your auth config from a class

If the `useFactory` makes your app module bloated with a lot of boilerplate code, you can `useClass` to provide an existing config provider class. The class must implement `HybridAuthOptionsFactory` interface and `createHybridAuthOptions` method. This method should return `HybridAuthModuleOptions` object. Similar to `useFactory`, whatever you provide in `inject` array, it will get injected in the constructor of your class. Follow the example:

**hybrid-auth.config.ts**

```typescript
import { ConfigService } from '@nestjs/config';
import {
  HybridAuthModuleOptions,
  HybridAuthOptionsFactory,
} from '@nestjs-hybrid-auth/all';

@Injectable()
class HybridAuthConfig implements HybridAuthOptionsFactory {
  constructor(private configService: ConfigService) {}

  createHybridAuthOptions(): HybridAuthModuleOptions {
    return {
      google: {
        clientID: configService.get('GOOGLE_CLIENT_ID'),
        clientSecret: configService.get('GOOGLE_CLIENT_SECRET'),
        callbackURL: configService.get('GOOGLE_CALLBACK_URL'),
      },
      facebook: {
        clientID: configService.get('FACEBOOK_CLIENT_ID'),
        clientSecret: configService.get('FACEBOOK_CLIENT_SECRET'),
        callbackURL: configService.get('FACEBOOK_CALLBACK_URL'),
      },
      // Rest of the providers
    };
  }
}
```

**app.module.ts**

```typescript
import { HybridAuthModule } from '@nestjs-hybrid-auth/all';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      expandVariables: true,
    }),
    HybridAuthModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useClass: HybridAuthConfig,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

## Example Code For Controller

Once you have setup the module properly in module file, its time to configure your route handlers to make the user properly redirected to appropriate identity provider's login page. `@nestjs-hybrid-auth/all` exports route handler guards for all identity providers it supports from `@nestjs-hybrid-auth/<identity-provider>` where `identity-provider` can be `facebook/google/linkedin/twitter` etc.

Each route will have two variants. One is to redirect to social login page and the other is to collect the response such as access/refresh tokens and user profile etc. The result will be attached to `Request` object's `hybridAuthResult` property as shown in the example below.

### app.controller.ts

#### This controller examples shows facebook login using hybrid auth.

```typescript
import { UseFacebookAuth, FacebookAuthResult } from '@nestjs-hybrid-auth/all';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UseFacebookAuth()
  @Get('auth/facebook')
  loginWithFacebook() {
    return 'Login with Facebook';
  }

  @UseFacebookAuth()
  @Get('auth/facebook-login/callback')
  facebookCallback(@Request() req): Partial<FacebookAuthResult> {
    const result: FacebookAuthResult = req.hybridAuthResult;
    return {
      accessToken: result.accessToken,
      refreshToken: result.refreshToken,
      profile: result.profile,
    };
  }
}
```

## Exports For Module File

`@nestjs-hybrid-auth/all` exports various interfaces and methods for module registration.

### HybridAuthModule

This is the dynamic module which must be imported in your app's main module with `forRoot` or `forRootAsync` static methods whichever suits your need. Both will return a [NestJS dynamic module](https://docs.nestjs.com/fundamentals/dynamic-modules).

```typescript
interface HybridAuthModule {
  forRoot(options: HybridAuthModuleOptions): DynamicModule;
  forRootAsync(options: HybridAuthModuleAsyncOptions): DynamicModule;
}
```

### HybridAuthModuleOptions

If you are configuring your module with `forRoot` static method, pass in the module options given below. The options object is just a container for various identity providers strategy options.

```typescript
interface HybridAuthModuleOptions {
  google: GoogleAuthModuleOptions;
  facebook: FacebookAuthModuleOptions;
  linkedin: LinkedinAuthModuleOptions;
  twitter: TwitterAuthModuleOptions;
  github: GithubAuthModuleOptions;
}
```

### HybridAuthModuleAsyncOptions

If you want to configure the `HybridAuthModule` dynamically having the config or other services injected, pass in async options in the `forRootAsync` static method. Please refer to the example above for `useFactory` and `useClass` properties.

```typescript
interface HybridAuthModuleAsyncOptions {
  useExisting?: Type<HybridAuthOptionsFactory>;
  useClass?: Type<HybridAuthOptionsFactory>;
  useFactory?: (
    ...args: any[]
  ) => Promise<HybridAuthModuleOptions> | HybridAuthModuleOptions;
  inject?: any[];
}
```

### HybridAuthOptionsFactory

```typescript
interface HybridAuthOptionsFactory {
  createHybridAuthOptions():
    | Promise<HybridAuthModuleOptions>
    | HybridAuthModuleOptions;
}
```

## Exports For Controller File

`@nestjs-hybrid-auth/all` just re-exports all the authentication route guards and result interfaces from all the individual identity providers. For more information, you can check the documentation for any provider for e.g.`@nestjs-hybrid-auth/google`.

## Have Issues?

If you still have trouble setting up the workflow properly, please file an issue at [Issues](https://facebook.com/mjangir/nestjs-hybrid-auth/issues) page.

## Maintainers

[Manish Jangir](https://facebook.com/mjangir)
