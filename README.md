# now-automator

[![Build Status](https://travis-ci.org/andreleite/now-automator.svg?branch=master)](https://travis-ci.org/andreleite/now-automator)
[![npm](https://img.shields.io/npm/v/now-automator.svg?maxAge=2592000)](https://www.npmjs.com/package/now-automator)

Utility to automate tasks in zeit.co/now service

## Instalation

```
npm install now-automator -g
```

## Usage

```
$ now-automator <command>

Commands:

  auto-apply-alias             apply last alias of project in last deployment
  remove-old-deployments       remove all old deploys
  help                         this help
```

## How to use

```
now && now-automator auto-apply-alias && now-automator remove-old-deployments
```
