import { OpenapiFactory } from '@libs/core/factory/openapi.factory';
import { Sites } from '@prisma/client';

export const SitesInputSchema = OpenapiFactory.generateSchema<Sites>({
  schemaName: 'SitesInput',
  params: [
    {
      required: true,
      type: 'string',
      name: 'userId',
    },
    {
      required: true,
      type: 'string',
      name: 'link',
    },
  ],
});

export const SitesSchema = OpenapiFactory.generateSchema<Sites>({
  schemaName: 'Sites',
  params: [
    {
      required: true,
      type: 'string',
      name: 'id',
    },
    {
      required: true,
      type: 'string',
      name: 'userId',
    },
    {
      required: true,
      type: 'string',
      name: 'link',
    },
  ],
});
