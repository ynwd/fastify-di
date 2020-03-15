# Fastify Dependecy Injection
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](http://standardjs.com) ![build](https://github.com/ynwd/fastify-di/workflows/build/badge.svg)

- [Install](#install)
- [Getting Started](#getting-started)

## Install 
```
npm i fastify-di fastify mysql typeorm
```
```
npm i typescript @types/node -D
```

## Getting Started
- Folder Structure:
  ```
  .
  ├── src
  │   ├── hello.controller.ts
  │   └── main.ts
  ├── package.json
  ├── server.config.js
  └── tsconfig.json
  ```
- Create configuration file:
  ```js
  // file server.config.js
  module.exports = {
    app: {
      env: 'development',
      port: 3000
    },
    mysql: {
      name: 'default',
      type: 'mysql',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'test',
      synchronize: true,
      logging: false
    }
  }
  ```
  ```ts
  // file tsconfig.json
  {
    "compilerOptions": {
      "module": "commonjs",
      "esModuleInterop": true,
      "resolveJsonModule": true,
      "allowSyntheticDefaultImports": true,
      "target": "es6",
      "strict": true,
      "noImplicitAny": false,
      "moduleResolution": "node",
      "sourceMap": true,
      "outDir": "dist",
      "baseUrl": ".",
      "jsx": "react",
      "emitDecoratorMetadata": true,
      "experimentalDecorators": true,
      "strictPropertyInitialization": false
    }
  }
  ```
- Create controller:
  ```ts
  // file hello.controller.ts
  import { Controller, Get } from 'fastify-di'
  import { FastifyReply, FastifyRequest } from 'fastify'
  import { Http2ServerResponse } from 'http2'

  @Controller()
  export class HelloController {
    @Get()
    sayHello (request: FastifyRequest, reply: FastifyReply<Http2ServerResponse>): any {
      reply.send('hello')
    }
  }

  ```
- Create server:
  ```ts
  // file main.ts
  import { createServer, start } from 'fastify-di'

  createServer()
    .then(server => {
      start(server)
    })
  ```
- Run server:
    ```
    npx tsc
    ```
    ```
    node dist/main.js
    ``` 