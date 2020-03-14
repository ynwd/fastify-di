# Plugins Folder

Plugins define behavior that is common to all the routes in your
application. Authentication, caching, templates, and all the other cross
cutting concerns should be handled by plugins placed in this folder.

You can create new plugin by just copy and modify `support.plugin` file.
Server will load and register it automatically.

Check out:

* [The hitchhiker's guide to plugins](https://github.com/fastify/fastify/blob/master/docs/Plugins-Guide.md)
* [Fastify decorators](https://www.fastify.io/docs/latest/Decorators/).
* [Fastify lifecycle](https://www.fastify.io/docs/latest/Lifecycle/).
