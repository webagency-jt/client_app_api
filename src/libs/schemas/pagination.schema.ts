import { OpenapiFactory } from '@libs/core/factory/openapi.factory';
import { IPagination } from '@libs/core/interfaces/pagination.interface';

export const PaginationSchema = OpenapiFactory.generateSchema<IPagination>({
  schemaName: 'Pagination',
  params: [
    {
      required: true,
      type: 'any',
      name: 'skip',
    },
    {
      required: true,
      type: 'any',
      name: 'take',
    },
  ],
});
