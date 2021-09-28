---
sidebar_position: 1
---

# Getting Started

NestJS hybrid auth is a dynamic nestjs module or assembling of individual modules written over passport authentication library which enables you to integrate social login in your nestjs application for various identity providers such as Facebook, Google, Instagram and many more.

## Prerequisites

The library requires you to install few peer dependencies

```bash
npm install @nestjs/passport passport reflect-metadata --save
```

OR

```bash
yarn add @nestjs/passport passport reflect-metadata
```

## How To Install

You can install nestjs hybrid auth module for just a single social identity provider or all the supported providers. Both of them are identical. I would recommend if you have lots of social logins to integrate, just use the all-in-one variant.

### Install Hybrid Auth All In One

```bash
yarn add @nestjs-hybrid-auth/all
```

OR

```bash
npm install @nestjs-hybrid-auth/all --save
```

### Install Hybrid Auth For Individual Identity Provider

```bash
yarn add @nestjs-hybrid-auth/<provider-name>
```

OR

```bash
npm install @nestjs-hybrid-auth/<provider-name> --save
```

Where `provider-name` can be `facebook`, `google`, `twitter` or anything supported.
