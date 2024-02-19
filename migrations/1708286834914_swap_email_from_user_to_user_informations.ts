import { Db, WithId } from 'mongodb';
import { MigrationInterface } from 'mongo-migrate-ts';
import { Prisma, User, UserInformations } from '@prisma/client';

export class swap_email_from_user_to_user_informations1708286834914 implements MigrationInterface {
  public async up(db: Db): Promise<any> {
    const userCollection = db.collection<User>('User');
    const userInformationsCollection = db.collection<UserInformations>('UserInformations');
    const users = await userCollection.find({}).toArray();
    for (const user of users) {
      // Old definition contain email we need to define this in the type
      const userType = user as WithId<Prisma.UserCreateInput> & { email: string; };
      const email = userType?.email;
      userCollection.updateOne(
        {
          _id: user._id,
        },
        {
          $unset: {
            email: '',
          },
        }
      );

      if (email) {
        userInformationsCollection.updateOne(
          {
            userId: user._id.toHexString(),
          },
          {
            $set: {
              email,
            },
          }
        );
      }
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async down(_db: Db): Promise<any> {
    // ! no down for this migration
  }
}
