# generator-ts-express
A small generator for Express.js microservices with Typescript and PostgreSQL.  
Tech stacks:
- Node.js
- Express.js
- Typescript
- PostgreSQL
- Jest
- ESLint
- Docker
- Bunyan Logger

## How to use
1. Install Yeoman globally ``npm i -g yo``
2. Clone this repo
3. In the directory, run ``npm link``

### Generate a microservice
```metadata bash
yo ts-express 
```
Then you might input the microservice name, node version, and other customization

### Generate a route
```metadata bash
yo ts-express:route
```
Then you might input the route name and method

### Generate a database table repository
```metadata bash
yo ts-express:repository
```
Then you might input the repository name and table
