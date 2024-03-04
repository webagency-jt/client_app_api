import { Db } from 'mongodb';
import { MigrationInterface } from 'mongo-migrate-ts';
import { Sites } from '@prisma/client';

export class add_name_to_sites1709571406874 implements MigrationInterface {
  public async up(db: Db): Promise<any> {
    const sitesCollection = db.collection<Sites>('Sites');
    const sites = await sitesCollection.find({}).toArray();
    for (const site of sites) {
      sitesCollection.updateOne(
        {
          _id: site._id,
        },
        {
          $set: {
            name: 'New site',
          },
        }
      );
    }
  }

  public async down(db: Db): Promise<any> {
    // ! now down for this migration
  }
}
