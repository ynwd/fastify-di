# Services Folder

In this folder you should define all services and the controller that define the routes
of your web application. 

- `*.entity.ts` contains class that define all entity (table) of database.
- `*.service.ts` contains class that have function to manipulate the entity.
- `*.controller.ts` contains all routes wrapped by controller.
- `*.schema.ts` contains all schema need for perfomance, payload, and response validation.

Place those files in a folder. Name the folder with specific usage:
```
src/services
├── hello
│   └── hello.controller.ts
└── user
    ├── user.controller.ts
    ├── user.entity.ts
    ├── user.schema.ts
    └── user.service.ts
```
