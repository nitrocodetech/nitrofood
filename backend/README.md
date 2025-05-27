<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>

## Description

NitroTech: Multivendor E-commerce Delivery Solution Backend

## Project setup

```bash
# development
$ npm run start
```

## Production Configuration

Follow these commands to get started

1. First go to <a href="console.neon.tech" target="_blank">Neon</a> and create PostgreSQL link.

2. Goto your neon project dashboard navigate to SQL Editor and run this `CREATE EXTENSION IF NOT EXISTS postgis;`.

3. Create new `.env` file and add variable DATABASE_URL and then assign that PostgreSQL link.

4. Run seed to create admin in db `npx prisma db seed`

5. Push Prisma Schema to the Database
   This updates your actual database to match your schema (creates tables, etc.): `npx prisma db push`

6. (Optional) Generate Prisma Client
   Usually db push already does this, but if needed manually: `npx prisma generate`

## Development Commands

Follow these commands to get started

`npx prisma db push`

`npx prisma migrate dev`

`npx prisma migrate deploy`

`npx prisma format`

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
