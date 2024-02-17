import { Db } from 'mongodb';
import { MigrationInterface } from 'mongo-migrate-ts';
import { $Enums, Prisma } from '@prisma/client';

export class add_roles_to_user1708190415664 implements MigrationInterface {
  public async up(db: Db): Promise<any> {
    const collection = db.collection<Prisma.UserCreateInput>('User');
    const users = await collection.find({}).toArray();
    for (const user of users) {
      collection.updateOne(
        {
          _id: user._id,
        },
        {
          $set: {
            role: $Enums.UserRole.user,
          },
        }
      );
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async down(_db: Db): Promise<any> {
    // ! no down for this migration
  }
}
