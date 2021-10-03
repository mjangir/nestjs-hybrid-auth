# NestJS Twitch Authentication

Implement twitch authentication in your NestJS application.

## Install

```bash
npm install @nestjs-hybrid-auth/twitch --save
```

OR

```bash
yarn add @nestjs-hybrid-auth/twitch
```

### Note: **Twitch oauth applications require secure redirect urls. Please make sure to have https in your dev env also.**

## How To Use?

The package exports mainly a [dynamic module](https://docs.nestjs.com/fundamentals/dynamic-modules) and [guard](https://docs.nestjs.com/guards). The module should be imported in your app.module.ts and guards should be used on the route handlers of any controller.

## Example Code For app.module.ts

### Simple static configuration

Want to jump directly to the [available options](#twitchauthmoduleoptions)?

If you just want to provide the static values or have them handy, pass them as options to the `forRoot` static method like below. The options object is type of `TwitchAuthModuleOptions`.

```typescript
import { TwitchAuthModule } from '@nestjs-hybrid-auth/twitch';

@Module({
  imports: [
    TwitchAuthModule.forRoot({
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

If you want to make use of nest's [ConfigModule](https://docs.nestjs.com/techniques/configuration#installation) to get the auth configuration for a provider from `.env` config files, use `forRootAsync` static method. The options to this method are typeof `TwitchAuthModuleAsyncOptions` which accepts a `useFactory` property. `useFactory` is a function which gets the instances injected whatever has been provided in `inject` array. You can use those instances to prepare and return the actual `TwitchAuthModuleOptions` object. ConfigService can be one of them as per your choice.

```typescript
import { TwitchAuthModule } from '@nestjs-hybrid-auth/twitch';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      expandVariables: true,
    }),
    TwitchAuthModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        clientID: configService.get('TWITCH_CLIENT_ID'),
        clientSecret: configService.get('TWITCH_CLIENT_SECRET'),
        callbackURL: configService.get('TWITCH_CALLBACK_URL'),
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

### Use `useClass` to get your auth config from a class

If the `useFactory` makes your app module bloated with a lot of boilerplate code, you can `useClass` to provide an existing config provider class. The class must implement `TwitchAuthModuleOptionsFactory` interface and `createModuleOptions` method. This method should return `TwitchAuthModuleOptions` object. Similar to `useFactory`, whatever you provide in `inject` array, it will get injected in the constructor of your class. Follow the example:

**hybrid-auth.config.ts**

```typescript
import { ConfigService } from '@nestjs/config';
import {
  TwitchAuthModuleOptions,
  TwitchAuthModuleOptionsFactory,
} from '@nestjs-hybrid-auth/twitch';

@Injectable()
class HybridAuthConfig implements TwitchAuthModuleOptionsFactory {
  constructor(private configService: ConfigService) {}

  createModuleOptions(): TwitchAuthModuleOptions {
    return {
      clientKey: this.configService.get('TWITCH_CLIENT_ID'),
      clientSecret: this.configService.get('TWITCH_CLIENT_SECRET'),
      callbackURL: this.configService.get('TWITCH_CALLBACK_URL'),
    };
  }
}
```

**app.module.ts**

```typescript
import { TwitchAuthModule } from '@nestjs-hybrid-auth/twitch';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      expandVariables: true,
    }),
    TwitchAuthModule.forRootAsync({
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

Once you have setup the module properly in module file, its time to configure your route handlers to make the user properly redirected to appropriate identity provider's login page. `@nestjs-hybrid-auth/twitch` provides a guard and result interface to make it enabled.

Each route will have two variants. One is to redirect to social login page and the other is to collect the response such as access/refresh tokens and user profile etc. The result will be attached to `Request` object's `hybridAuthResult` property as shown in the example below.

### app.controller.ts

```typescript
import { UseTwitchAuth, TwitchAuthResult } from '@nestjs-hybrid-auth/twitch';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UseTwitchAuth()
  @Get('auth/twitch')
  loginWithTwitch() {
    return 'Login with Twitch';
  }

  @UseTwitchAuth()
  @Get('auth/twitch-login/callback')
  twitchCallback(@Request() req): Partial<TwitchAuthResult> {
    const result: TwitchAuthResult = req.hybridAuthResult;
    return {
      accessToken: result.accessToken,
      refreshToken: result.refreshToken,
      profile: result.profile,
    };
  }
}
```

## Exports

`@nestjs-hybrid-auth/twitch` exports various decorators, interfaces and methods.

### UseTwitchAuth

`UseTwitchAuth` is NestJS `Guard` which hijacks your nest request and redirects users to the appropriate login page of your configured identity provider (twitch in this case). The same guard can be used on `callback` route also as shown in the example above. In the callback route handler, the `req: Request` object will have a property `hybridAuthResult` which is an object of type `TwitchAuthResult`.

```typescript
@UseTwitchAuth(options: TwitchAuthGuardOptions)
@Get('auth/twitch')
loginWithTwitch() {
  return 'Login with Twitch';
}
```

### TwitchAuthGuardOptions

This is a simple object to be passed into `UseTwitchAuth` guard as shown in example above if you want to pass some extra parameters to query the twitch result. It can be left empty for default result.

### TwitchAuthModule

This is the dynamic module which must be imported in your app's main module with `forRoot` or `forRootAsync` static methods whichever suits your need. Both will return a [NestJS dynamic module](https://docs.nestjs.com/fundamentals/dynamic-modules).

```typescript
interface TwitchAuthModule {
  forRoot(options: TwitchAuthModuleOptions): DynamicModule;
  forRootAsync(options: TwitchAuthModuleAsyncOptions): DynamicModule;
}
```

### TwitchAuthModuleOptions

If you are configuring your module with `forRoot` static method, pass in the module options given below. They can be called the twitch passport strategy options also.

```typescript
interface TwitchAuthModuleOptions {
  clientID: string;
  clientSecret: string;
  callbackURL: string;
  scope?: string[] | undefined;
}
```

### TwitchAuthModuleAsyncOptions

If you want to configure the `TwitchAuthModule` dynamically having the config or other services injected, pass in async options in the `forRootAsync` static method. Please refer to the example above for `useFactory` and `useClass` properties.

```typescript
interface TwitchAuthModuleAsyncOptions {
  useExisting?: Type<TwitchAuthModuleOptionsFactory>;
  useClass?: Type<TwitchAuthModuleOptionsFactory>;
  useFactory?: (
    ...args: any[]
  ) => Promise<TwitchAuthModuleOptions> | TwitchAuthModuleOptions;
  inject?: any[];
}
```

### TwitchAuthModuleOptionsFactory

```typescript
interface TwitchAuthModuleOptionsFactory {
  createModuleOptions():
    | Promise<TwitchAuthModuleOptions>
    | TwitchAuthModuleOptions;
}
```

## Have Issues?

If you still have trouble setting up the workflow properly, please file an issue at [Issues](https://github.com/mjangir/nestjs-hybrid-auth/issues) page.

## Maintainers

[Manish Jangir](https://github.com/mjangir)
