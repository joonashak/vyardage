# Database

Vyardage uses Postgres to persist data. The database is provided by Heroku in production/staging and through Docker in development/testing.

#### Naming Conventions

Altough somewhat unusual, tables use singular PascalCase names and columns camelCase names. This is because camelCase is used in code, and I cannot think of a good reason to use the conventional snake-case in database, even if the conversion is automatic...

## Database Diagram

![Database Diagram](./assets/database.png)

The source for the diagram is available [here](./assets/database.dbml).
