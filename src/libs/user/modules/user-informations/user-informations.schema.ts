import { z } from '@hono/zod-openapi';

export const UserInformationsInputSchema = z.object({
  userId: z
    .string()
    .openapi({
      param: {
        name: 'userId',
      },
      example: '65c7d4915826284e1cc90ce3',
    }),
  address: z
    .string()
    .openapi({
      param: {
        name: 'address',
      },
    }),
  city: z
    .string()
    .openapi({
      param: {
        name: 'city',
      },
    }),
  firstname: z
    .string()
    .openapi({
      param: {
        name: 'firstname',
      },
    }),
  lastname: z
    .string()
    .openapi({
      param: {
        name: 'lastname',
      },
    }),
  phoneNumber: z
    .string()
    .openapi({
      param: {
        name: 'phoneNumber',
      },
    }),
  siret: z
    .string()
    .openapi({
      param: {
        name: 'siret',
      },
    }),
  state: z
    .string()
    .openapi({
      param: {
        name: 'state',
      },
    }),
  tva: z
    .number()
    .openapi({
      param: {
        name: 'tva',
      },
    }),
  zip: z
    .string()
    .openapi({
      param: {
        name: 'zip',
      },
    }),
});

export const UserInformationsUpdateInputSchema = z.object({
  userId: z
    .string()
    .openapi({
      param: {
        name: 'userId',
      },
      example: '65c7d4915826284e1cc90ce3',
    }),
  address: z
    .string()
    .openapi({
      param: {
        name: 'address',
      },
    })
    .optional(),
  city: z
    .string()
    .openapi({
      param: {
        name: 'city',
      },
    })
    .optional(),
  firstname: z
    .string()
    .openapi({
      param: {
        name: 'firstname',
      },
    })
    .optional(),
  lastname: z
    .string()
    .openapi({
      param: {
        name: 'lastname',
      },
    })
    .optional(),
  phoneNumber: z
    .string()
    .openapi({
      param: {
        name: 'phoneNumber',
      },
    })
    .optional(),
  siret: z
    .string()
    .openapi({
      param: {
        name: 'siret',
      },
    })
    .optional(),
  state: z
    .string()
    .openapi({
      param: {
        name: 'state',
      },
    })
    .optional(),
  tva: z
    .string()
    .openapi({
      param: {
        name: 'tva',
      },
    })
    .optional(),
  zip: z
    .string()
    .openapi({
      param: {
        name: 'zip',
      },
    })
    .optional(),
});

export const UserInformationsSchema = z.object({
  id: z.string(),
  userId: z
    .string()
    .openapi({
      param: {
        name: 'userId',
      },
      example: '65c7d4915826284e1cc90ce3',
    }),
  address: z
    .string()
    .openapi({
      param: {
        name: 'address',
      },
    }),
  city: z
    .string()
    .openapi({
      param: {
        name: 'city',
      },
    }),
  firstname: z
    .string()
    .openapi({
      param: {
        name: 'firstname',
      },
    }),
  lastname: z
    .string()
    .openapi({
      param: {
        name: 'lastname',
      },
    }),
  phoneNumber: z
    .string()
    .openapi({
      param: {
        name: 'phoneNumber',
      },
    }),
  siret: z
    .string()
    .openapi({
      param: {
        name: 'siret',
      },
    }),
  state: z
    .string()
    .openapi({
      param: {
        name: 'state',
      },
    }),
  tva: z
    .string()
    .openapi({
      param: {
        name: 'tva',
      },
    }),
  zip: z
    .string()
    .openapi({
      param: {
        name: 'zip',
      },
    }),
}).openapi('UserInformations');

