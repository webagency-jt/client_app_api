import { Db } from 'mongodb';
import { MigrationInterface } from 'mongo-migrate-ts';
import { User } from '@prisma/client';

export class add_missing_property_created_at1709573185691 implements MigrationInterface {
  public async up(db: Db): Promise<any> {
    const usersCollection = db.collection<User>('User');
    const users = await usersCollection.find({}).toArray();

    for (const user of users) {
      await usersCollection.updateOne(
        {
          _id: user._id,
        },
        {
          $set: {
            created_at: new Date(),
          },
        }
      );
    }

  }

  public async down(_db: Db): Promise<any> {
    // ! now down for this migration
  }
}
