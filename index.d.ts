import * as http from 'http'
import fastify, { FastifyInstance } from 'fastify'
import {
  Connection,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  ObjectType,
  EntitySchema,
  Repository,
  getConnection
} from 'typeorm'

declare module 'fastify' {
  export interface FastifyInstance<
    HttpServer = http.Server,
    HttpRequest = http.IncomingMessage,
    HttpResponse = http.ServerResponse
    > {
    someSupport(): string;
  }

  interface RouteOptions<
    HttpServer = http.Server,
    HttpRequest = http.IncomingMessage,
    HttpResponse = http.ServerResponse,
    Query = DefaultQuery,
    Params = DefaultParams,
    Headers = DefaultHeaders,
    Body = DefaultBody
  > extends RouteShorthandOptions<HttpServer, HttpRequest, HttpResponse, Query, Params, Headers, Body> {
    method: HTTPMethod | HTTPMethod[];
    url: string;
    schema?: RouteSchema;
    handler: RequestHandler<HttpRequest, HttpResponse, Query, Params, Headers, Body>;
  }

  interface FastifyInstance<HttpServer = http.Server, HttpRequest = http.IncomingMessage, HttpResponse = http.ServerResponse> {
    addHook (name: 'onRegister', hook: (instance: FastifyInstance, opts: any) => void): FastifyInstance<HttpServer, HttpRequest, HttpResponse>;
  }

  interface FastifyReply<HttpResponse>{
    sendOk<T>(this: FastifyReply<HttpResponse>, payload?: T, message?: string, statusCode?: number): void;
    sendError(this: FastifyReply<HttpResponse>, error: FastifyError): void;
  }
}

export declare abstract class BasicEntity {
  @PrimaryGeneratedColumn('uuid')
  id?: string

  @CreateDateColumn()
  createdAt?: Date

  @UpdateDateColumn()
  updatedAt?: Date
}
export declare abstract class BasicService {
  private conn: Connection
  public getConnection (): Connection
  public repo<Entity> (entityClass: ObjectType<Entity> | EntitySchema<Entity> | string): Repository<Entity>
  public err (errorName: string, error: Error): Error
  public close (): void
}

export type config = {
  app: {
    env: string;
    port: number;
  };
  mysql: {
    name: string;
    type: 'mysql';
    port: number;
    username: string;
    password: string;
    database: string;
    synchronize: boolean;
    logging: boolean;
  };
}

export declare function Get(options?: any): Function
export declare function Post(options?: any): Function
export declare function Controller(options?: any): Function
export declare function Service(): Function
export declare function InjectService(service: Function): any
export declare function createServer(fastifyOpts?: fastify.ServerOptions): Promise<FastifyInstance>
export declare function createConnection(): Promise<Connection>
export declare function start(server: FastifyInstance): Promise<void>
export declare function createError(name: string, error: Error): Error
export declare function loader (): Promise<void>
export declare const controllerContainer: Map<string | symbol | Object, any>
export declare const serviceContainer: Map<string | symbol | Object, any>
export declare const methodContainer: any[]
export declare const hookContainer: any[]
export declare const pluginContainer: any[]
export declare const token: Symbol
export declare const configuration: config
