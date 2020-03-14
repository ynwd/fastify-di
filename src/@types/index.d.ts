import { ServerResponse } from 'http'
import * as http from 'http'
import { FastifyError } from 'fastify'

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
