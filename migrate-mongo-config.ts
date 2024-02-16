import { mongoMigrateCli } from 'mongo-migrate-ts';

const uri = process.env.DATABASE_URL;
const database = process.env.DATABASE_NAME;
const migrationsDir = `migrations`;

mongoMigrateCli({
  uri,
  database,
  migrationsDir: `migrations`,
  migrationsCollection: 'changelog',
});