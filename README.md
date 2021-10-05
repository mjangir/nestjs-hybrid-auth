# NestJS Hybrid Auth

<p align="center">
   <img src="media/nestjs-hybrid-auth.png" alt="NestJS Hybrid Auth"/>
</p>

![npm type definitions](https://img.shields.io/npm/types/typescript)
![npm](https://img.shields.io/npm/v/@nestjs-hybrid-auth/all)
[![compressed size](https://github.com/mjangir/nestjs-hybrid-auth/actions/workflows/size.yml/badge.svg)](https://github.com/mjangir/nestjs-hybrid-auth/actions/workflows/size.yml)
![GitHub](https://img.shields.io/github/license/mjangir/nestjs-hybrid-auth?label=license)

NestJS hybrid auth is a dynamic nestjs module or assembling of individual modules written over passport authentication library which enables you to integrate social login in your nestjs application for various identity providers such as Facebook, Google, Instagram and many more.

**Please visit https://nestjs-hybrid-auth.manishjangir.com for complete documentation**

## Prerequisites

The library requires you to install few peer dependencies

```bash
npm install @nestjs/passport passport reflect-metadata --save
```

OR

```bash
yarn add @nestjs/passport passport reflect-metadata
```

## Install Hybrid Auth

You can install the library for all providers or install it separately for each identity provider.

### For All Providers

```bash
npm install @nestjs-hybrid-auth/all --save
```

```bash
yarn add @nestjs-hybrid-auth/all
```

### For Individual Identity

```bash
npm install @nestjs-hybrid-auth/google --save
```

```bash
yarn add @nestjs-hybrid-auth/google
```

## How To Use?

Every individual package or the global all-in-one hybrid auth package exports a dynamic nestjs module and nest `Guard` (controller method decorator) which sets up the login and callback workflow.

**Note:** This is just a usage snippet. Please read the actual documentation of an identity provider for its peer dependencies.

### In \*.module.ts file

**If you are using individual package**

```javascript
import { GoogleAuthModule } from '@nestjs-hybrid-auth/google';

@Module({
  import: [
    GoogleAuthModule.forRoot({
      clientID: 'xxxxxxxxxxxx',
      clientSecret: 'xxxxxxxxxx',
      requestCallbackURL: 'xxxxxxxxx',
    }),
  ],
})
class AppModule {}
```

**Or if you are using all-in-one package**

```javascript
import { HybridAuthModule } from '@nestjs-hybrid-auth/all';

@Module({
  import: [
    HybridAuthModule.forRoot({
      google: {
        clientID: 'xxxxxxxxxxxx',
        clientSecret: 'xxxxxxxxxx',
        requestCallbackURL: 'xxxxxxxxx',
      },
    }),
  ],
})
class AppModule {}
```

### In \*.controller.ts file

```javascript
import { UseGoogleAuth } from '@nestjs-hybrid-auth/google';
// OR
import { UseGoogleAuth } from '@nestjs-hybrid-auth/all';

@Controller
class AuthController {
  @UseGoogleAuth()
  @Get('auth/google')
  googleLogin() {}

  @UseGoogleAuth()
  @Get('auth/google-callback') // This is the route configured in your Google oauth app
  googleLoginCallback(req: Request) {
    console.log(req.hybridAuthResult.user | accessToken | refreshToken);
  }
}
```

**Note**:

1. As passport uses express under the hood, fastify applications may not work with this package.
2. Please read the full documentation for an identity provider before using it because some providers may require few additional dependencies to be installed to work properly.

## Supported Identity Providers (Many more are yet to come)

- [Google](https://nestjs-hybrid-auth.manishjangir.com/docs/providers/google)
- [Facebook](https://nestjs-hybrid-auth.manishjangir.com/docs/providers/facebook)
- [LinkedIn](https://nestjs-hybrid-auth.manishjangir.com/docs/providers/linkedin)
- [Twitter](https://nestjs-hybrid-auth.manishjangir.com/docs/providers/twitter)
- [GitHub](https://nestjs-hybrid-auth.manishjangir.com/docs/providers/github)
- [Instagram](https://nestjs-hybrid-auth.manishjangir.com/docs/providers/instagram)
- [Twitch](https://nestjs-hybrid-auth.manishjangir.com/docs/providers/twitch)
- [Okta](https://nestjs-hybrid-auth.manishjangir.com/docs/providers/okta)

## Related

- [NestJS](https://nestjs.com)
- [Passport](http://www.passportjs.org)

## Maintainers & Contributors

[Manish Jangir](https://github.com/mjangir)

## Credits

[Gopendra Jangir](https://github.com/gopendrajangir) (Banner Image)
