import { mongoMigrateCli } from 'mongo-migrate-ts';

const uri = process.env.DATABASE_URL;
const database = process.env.DATABASE_NAME;

mongoMigrateCli({
  uri,
  database,
  migrationsDir: 'migrations',
  migrationsCollection: 'changelog',
});
