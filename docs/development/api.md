---
sidebar_position: 2
---

# API development
## Database
### Migrations - changes to DB Schema
MyFin currently depends on [Prisma](https://www.prisma.io/) for DB handling and migrations.

After making a change to a schema of the DB, run the following command to automatically update the `schema.prisma` file and generate the migration file:
````sh
npm run db:migrate-from-db
````

If you manually made changes to the `schema.prisma` file, run the following to generate the migration file:
````sh
npm run db:migrate
````