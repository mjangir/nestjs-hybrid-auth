# NestJS Facebook Authentication

Implement facebook authentication in your NestJS application.

## Install

```bash
npm install @nestjs-hybrid-auth/facebook --save
```

OR

```bash
yarn add @nestjs-hybrid-auth/facebook
```

## How To Use?

The package exports mainly a [dynamic module](https://docs.nestjs.com/fundamentals/dynamic-modules) and [guard](https://docs.nestjs.com/guards). The module should be imported in your app.module.ts and guards should be used on the route handlers of any controller.

## Example Code For app.module.ts

### Simple static configuration

Want to jump directly to the [available options](#facebookauthmoduleoptions)?

If you just want to provide the static values or have them handy, pass them as options to the `forRoot` static method like below. The options object is type of `FacebookAuthModuleOptions`.

```typescript
import { FacebookAuthModule } from '@nestjs-hybrid-auth/facebook';

@Module({
  imports: [
    FacebookAuthModule.forRoot({
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: process.env.CALLBACK_URL,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

### `useFactory` to get the ConfigService injected.

If you want to make use of nest's [ConfigModule](https://docs.nestjs.com/techniques/configuration#installation) to get the auth configuration for a provider from `.env` config files, use `forRootAsync` static method. The options to this method are typeof `FacebookAuthModuleAsyncOptions` which accepts a `useFactory` property. `useFactory` is a function which gets the instances injected whatever has been provided in `inject` array. You can use those instances to prepare and return the actual `FacebookAuthModuleOptions` object. ConfigService can be one of them as per your choice.

```typescript
import { FacebookAuthModule } from '@nestjs-hybrid-auth/facebook';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      expandVariables: true,
    }),
    FacebookAuthModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        clientID: configService.get('FACEBOOK_CLIENT_ID'),
        clientSecret: configService.get('FACEBOOK_CLIENT_SECRET'),
        callbackURL: configService.get('FACEBOOK_CALLBACK_URL'),
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

### Use `useClass` to get your auth config from a class

If the `useFactory` makes your app module bloated with a lot of boilerplate code, you can `useClass` to provide an existing config provider class. The class must implement `FacebookAuthModuleOptionsFactory` interface and `createModuleOptions` method. This method should return `FacebookAuthModuleOptions` object. Similar to `useFactory`, whatever you provide in `inject` array, it will get injected in the constructor of your class. Follow the example:

**hybrid-auth.config.ts**

```typescript
import { ConfigService } from '@nestjs/config';
import {
  FacebookAuthModuleOptions,
  FacebookAuthModuleOptionsFactory,
} from '@nestjs-hybrid-auth/facebook';

@Injectable()
class HybridAuthConfig implements FacebookAuthModuleOptionsFactory {
  constructor(private configService: ConfigService) {}

  createModuleOptions(): FacebookAuthModuleOptions {
    return {
      clientKey: this.configService.get('FACEBOOK_CLIENT_ID'),
      clientSecret: this.configService.get('FACEBOOK_CLIENT_SECRET'),
      callbackURL: this.configService.get('FACEBOOK_CALLBACK_URL'),
    };
  }
}
```

**app.module.ts**

```typescript
import { FacebookAuthModule } from '@nestjs-hybrid-auth/facebook';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      expandVariables: true,
    }),
    FacebookAuthModule.forRootAsync({
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

Once you have setup the module properly in module file, its time to configure your route handlers to make the user properly redirected to appropriate identity provider's login page. `@nestjs-hybrid-auth/facebook` provides a guard and result interface to make it enabled.

Each route will have two variants. One is to redirect to social login page and the other is to collect the response such as access/refresh tokens and user profile etc. The result will be attached to `Request` object's `hybridAuthResult` property as shown in the example below.

### app.controller.ts

```typescript
import {
  UseFacebookAuth,
  FacebookAuthResult,
} from '@nestjs-hybrid-auth/facebook';

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

## Exports

`@nestjs-hybrid-auth/facebook` exports various decorators, interfaces and methods.

### UseFacebookAuth

`UseFacebookAuth` is NestJS `Guard` which hijacks your nest request and redirects users to the appropriate login page of your configured identity provider (facebook in this case). The same guard can be used on `callback` route also as shown in the example above. In the callback route handler, the `req: Request` object will have a property `hybridAuthResult` which is an object of type `FacebookAuthResult`.

```typescript
@UseFacebookAuth(options: FacebookAuthGuardOptions)
@Get('auth/facebook')
loginWithFacebook() {
  return 'Login with Facebook';
}
```

### FacebookAuthGuardOptions

This is a simple object to be passed into `UseFacebookAuth` guard as shown in example above if you want to pass some extra parameters to query the facebook result. It can be left empty for default result.

### FacebookAuthModule

This is the dynamic module which must be imported in your app's main module with `forRoot` or `forRootAsync` static methods whichever suits your need. Both will return a [NestJS dynamic module](https://docs.nestjs.com/fundamentals/dynamic-modules).

```typescript
interface FacebookAuthModule {
  forRoot(options: FacebookAuthModuleOptions): DynamicModule;
  forRootAsync(options: FacebookAuthModuleAsyncOptions): DynamicModule;
}
```

### FacebookAuthModuleOptions

If you are configuring your module with `forRoot` static method, pass in the module options given below. They can be called the facebook passport strategy options also.

```typescript
interface FacebookAuthModuleOptions {
  clientID: string;
  clientSecret: string;
  callbackURL: string;

  scopeSeparator?: string | undefined;
  enableProof?: boolean | undefined;
  profileFields?: string[] | undefined;

  authorizationURL?: string | undefined;
  tokenURL?: string | undefined;
  profileURL?: string | undefined;
  graphAPIVersion?: string | undefined;

  display?: 'page' | 'popup' | 'touch' | undefined;

  authType?: 'reauthenticate' | undefined;
  authNonce?: string | undefined;
}
```

### FacebookAuthModuleAsyncOptions

If you want to configure the `FacebookAuthModule` dynamically having the config or other services injected, pass in async options in the `forRootAsync` static method. Please refer to the example above for `useFactory` and `useClass` properties.

```typescript
interface FacebookAuthModuleAsyncOptions {
  useExisting?: Type<FacebookAuthModuleOptionsFactory>;
  useClass?: Type<FacebookAuthModuleOptionsFactory>;
  useFactory?: (
    ...args: any[]
  ) => Promise<FacebookAuthModuleOptions> | FacebookAuthModuleOptions;
  inject?: any[];
}
```

### FacebookAuthModuleOptionsFactory

```typescript
interface FacebookAuthModuleOptionsFactory {
  createModuleOptions():
    | Promise<FacebookAuthModuleOptions>
    | FacebookAuthModuleOptions;
}
```

## Have Issues?

If you still have trouble setting up the workflow properly, please file an issue at [Issues](https://facebook.com/mjangir/nestjs-hybrid-auth/issues) page.

## Maintainers

[Manish Jangir](https://facebook.com/mjangir)
