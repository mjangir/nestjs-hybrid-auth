# NestJS Instagram Authentication

Implement instagram authentication in your NestJS application.

## Install

```bash
npm install @nestjs-hybrid-auth/instagram --save
```

OR

```bash
yarn add @nestjs-hybrid-auth/instagram
```

## How To Use?

The package exports mainly a [dynamic module](https://docs.nestjs.com/fundamentals/dynamic-modules) and [guard](https://docs.nestjs.com/guards). The module should be imported in your app.module.ts and guards should be used on the route handlers of any controller.

## Example Code For app.module.ts

### Simple static configuration

Want to jump directly to the [available options](#instagramauthmoduleoptions)?

If you just want to provide the static values or have them handy, pass them as options to the `forRoot` static method like below. The options object is type of `InstagramAuthModuleOptions`.

```typescript
import { InstagramAuthModule } from '@nestjs-hybrid-auth/instagram';

@Module({
  imports: [
    InstagramAuthModule.forRoot({
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

If you want to make use of nest's [ConfigModule](https://docs.nestjs.com/techniques/configuration#installation) to get the auth configuration for a provider from `.env` config files, use `forRootAsync` static method. The options to this method are typeof `InstagramAuthModuleAsyncOptions` which accepts a `useFactory` property. `useFactory` is a function which gets the instances injected whatever has been provided in `inject` array. You can use those instances to prepare and return the actual `InstagramAuthModuleOptions` object. ConfigService can be one of them as per your choice.

```typescript
import { InstagramAuthModule } from '@nestjs-hybrid-auth/instagram';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      expandVariables: true,
    }),
    InstagramAuthModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        clientID: configService.get('INSTAGRAM_CLIENT_ID'),
        clientSecret: configService.get('INSTAGRAM_CLIENT_SECRET'),
        callbackURL: configService.get('INSTAGRAM_CALLBACK_URL'),
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

### Use `useClass` to get your auth config from a class

If the `useFactory` makes your app module bloated with a lot of boilerplate code, you can `useClass` to provide an existing config provider class. The class must implement `InstagramAuthModuleOptionsFactory` interface and `createModuleOptions` method. This method should return `InstagramAuthModuleOptions` object. Similar to `useFactory`, whatever you provide in `inject` array, it will get injected in the constructor of your class. Follow the example:

**hybrid-auth.config.ts**

```typescript
import { ConfigService } from '@nestjs/config';
import {
  InstagramAuthModuleOptions,
  InstagramAuthModuleOptionsFactory,
} from '@nestjs-hybrid-auth/instagram';

@Injectable()
class HybridAuthConfig implements InstagramAuthModuleOptionsFactory {
  constructor(private configService: ConfigService) {}

  createModuleOptions(): InstagramAuthModuleOptions {
    return {
      clientKey: this.configService.get('INSTAGRAM_CLIENT_ID'),
      clientSecret: this.configService.get('INSTAGRAM_CLIENT_SECRET'),
      callbackURL: this.configService.get('INSTAGRAM_CALLBACK_URL'),
    };
  }
}
```

**app.module.ts**

```typescript
import { InstagramAuthModule } from '@nestjs-hybrid-auth/instagram';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      expandVariables: true,
    }),
    InstagramAuthModule.forRootAsync({
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

Once you have setup the module properly in module file, its time to configure your route handlers to make the user properly redirected to appropriate identity provider's login page. `@nestjs-hybrid-auth/instagram` provides a guard and result interface to make it enabled.

Each route will have two variants. One is to redirect to social login page and the other is to collect the response such as access/refresh tokens and user profile etc. The result will be attached to `Request` object's `hybridAuthResult` property as shown in the example below.

### app.controller.ts

```typescript
import {
  UseInstagramAuth,
  InstagramAuthResult,
} from '@nestjs-hybrid-auth/instagram';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UseInstagramAuth()
  @Get('auth/instagram')
  loginWithInstagram() {
    return 'Login with Instagram';
  }

  @UseInstagramAuth()
  @Get('auth/instagram-login/callback')
  instagramCallback(@Request() req): Partial<InstagramAuthResult> {
    const result: InstagramAuthResult = req.hybridAuthResult;
    return {
      accessToken: result.accessToken,
      refreshToken: result.refreshToken,
      profile: result.profile,
    };
  }
}
```

## Exports

`@nestjs-hybrid-auth/instagram` exports various decorators, interfaces and methods.

### UseInstagramAuth

`UseInstagramAuth` is NestJS `Guard` which hijacks your nest request and redirects users to the appropriate login page of your configured identity provider (instagram in this case). The same guard can be used on `callback` route also as shown in the example above. In the callback route handler, the `req: Request` object will have a property `hybridAuthResult` which is an object of type `InstagramAuthResult`.

```typescript
@UseInstagramAuth(options: InstagramAuthGuardOptions)
@Get('auth/instagram')
loginWithInstagram() {
  return 'Login with Instagram';
}
```

### InstagramAuthGuardOptions

This is a simple object to be passed into `UseInstagramAuth` guard as shown in example above if you want to pass some extra parameters to query the instagram result. It can be left empty for default result.

### InstagramAuthModule

This is the dynamic module which must be imported in your app's main module with `forRoot` or `forRootAsync` static methods whichever suits your need. Both will return a [NestJS dynamic module](https://docs.nestjs.com/fundamentals/dynamic-modules).

```typescript
interface InstagramAuthModule {
  forRoot(options: InstagramAuthModuleOptions): DynamicModule;
  forRootAsync(options: InstagramAuthModuleAsyncOptions): DynamicModule;
}
```

### InstagramAuthModuleOptions

If you are configuring your module with `forRoot` static method, pass in the module options given below. They can be called the instagram passport strategy options also.

```typescript
interface InstagramAuthModuleOptions {
  clientID: string;
  clientSecret: string;
  callbackURL: string;
  tokenURL?: string | undefined;
  authorizationURL?: string | undefined;
}
```

### InstagramAuthModuleAsyncOptions

If you want to configure the `InstagramAuthModule` dynamically having the config or other services injected, pass in async options in the `forRootAsync` static method. Please refer to the example above for `useFactory` and `useClass` properties.

```typescript
interface InstagramAuthModuleAsyncOptions {
  useExisting?: Type<InstagramAuthModuleOptionsFactory>;
  useClass?: Type<InstagramAuthModuleOptionsFactory>;
  useFactory?: (
    ...args: any[]
  ) => Promise<InstagramAuthModuleOptions> | InstagramAuthModuleOptions;
  inject?: any[];
}
```

### InstagramAuthModuleOptionsFactory

```typescript
interface InstagramAuthModuleOptionsFactory {
  createModuleOptions():
    | Promise<InstagramAuthModuleOptions>
    | InstagramAuthModuleOptions;
}
```

## Have Issues?

If you still have trouble setting up the workflow properly, please file an issue at [Issues](https://github.com/mjangir/nestjs-hybrid-auth/issues) page.

## Maintainers

[Manish Jangir](https://github.com/mjangir)
