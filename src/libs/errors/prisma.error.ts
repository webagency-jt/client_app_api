import { Prisma } from '@prisma/client';
import { StatusCodes } from 'http-status-codes';
import { ErrorReturn } from './https-errors';

// For more informations: https://www.prisma.io/docs/orm/reference/error-reference#prisma-client-query-engine
const PrismaClientErrorMap: { [key: string]: ErrorReturn; } = {
  P2000: {
    message: 'The length of the provided value exceeds the allowed limit for the specified column type.',
    httpCode: StatusCodes.BAD_REQUEST,
  },
  P2001: {
    message: 'The record searched does not exist.',
    httpCode: StatusCodes.NOT_FOUND,
  },
  P2002: {
    message: 'Unique constraint failed.',
    httpCode: StatusCodes.CONFLICT,
  },
  P2003: {
    message: 'Foreign key constraint failed.',
    httpCode: StatusCodes.UNPROCESSABLE_ENTITY,
  },
  P2004: {
    message: 'A constraint failed on the database.',
    httpCode: StatusCodes.INTERNAL_SERVER_ERROR,
  },
  P2005: {
    message: 'The value stored in the database is invalid for the field\'s type.',
    httpCode: StatusCodes.UNPROCESSABLE_ENTITY,
  },
  P2006: {
    message: 'The provided value is not valid.',
    httpCode: StatusCodes.UNPROCESSABLE_ENTITY,
  },
  P2007: {
    message: 'Data validation error.',
    httpCode: StatusCodes.UNPROCESSABLE_ENTITY,
  },
  P2008: {
    message: 'Failed to parse the query.',
    httpCode: StatusCodes.BAD_REQUEST,
  },
  P2009: {
    message: 'Failed to validate the query.',
    httpCode: StatusCodes.BAD_REQUEST,
  },
  P2010: {
    message: 'Raw query failed.',
    httpCode: StatusCodes.INTERNAL_SERVER_ERROR,
  },
  P2011: {
    message: 'Null constraint violation.',
    httpCode: StatusCodes.UNPROCESSABLE_ENTITY,
  },
  P2012: {
    message: 'Missing a required value.',
    httpCode: StatusCodes.UNPROCESSABLE_ENTITY,
  },
  P2013: {
    message: 'Missing the required argument.',
    httpCode: StatusCodes.BAD_REQUEST,
  },
  P2014: {
    message: 'The change you are trying to make would violate the required relation between models.',
    httpCode: StatusCodes.UNPROCESSABLE_ENTITY,
  },
  P2015: {
    message: 'A related record could not be found.',
    httpCode: StatusCodes.BAD_REQUEST,
  },
  P2016: {
    message: 'Query interpretation error.',
    httpCode: StatusCodes.BAD_REQUEST,
  },
  P2017: {
    message: 'The records for relation models are not connected.',
    httpCode: StatusCodes.UNPROCESSABLE_ENTITY,
  },
  P2018: {
    message: 'The required connected records were not found.',
    httpCode: StatusCodes.UNPROCESSABLE_ENTITY,
  },
  P2019: {
    message: 'Input error.',
    httpCode: StatusCodes.UNPROCESSABLE_ENTITY,
  },
  P2020: {
    message: 'Value out of range for the type.',
    httpCode: StatusCodes.UNPROCESSABLE_ENTITY,
  },
  P2021: {
    message: 'The called table does not exist in the current database .',
    httpCode: StatusCodes.NOT_FOUND,
  },
  P2022: {
    message: 'The called column does not exist in the current database.',
    httpCode: StatusCodes.NOT_FOUND,
  },
  P2023: {
    message: 'Inconsistent column data.',
    httpCode: StatusCodes.INTERNAL_SERVER_ERROR,
  },
  P2024: {
    // eslint-disable-next-line max-len
    message: 'Timed out fetching a new connection from the connection pool. (More info: http://pris.ly/d/connection-pool.',
    httpCode: StatusCodes.GATEWAY_TIMEOUT,
  },
  P2025: {
    message: 'An operation failed because it depends on one or more records that were required but not found.',
    httpCode: StatusCodes.UNPROCESSABLE_ENTITY,
  },
  P2026: {
    message: 'The current database provider doesn\'t support a feature that the query used.',
    httpCode: StatusCodes.NOT_IMPLEMENTED,
  },
  P2027: {
    message: 'Multiple errors occurred on the database during query execution.',
    httpCode: StatusCodes.INTERNAL_SERVER_ERROR,
  },
  P2028: {
    message: 'Transaction API error.',
    httpCode: StatusCodes.INTERNAL_SERVER_ERROR,
  },
  P2030: {
    message: 'Cannot find a fulltext index to use for the search, try adding a @@fulltext([Fields...]) to your schema.',
    httpCode: StatusCodes.INTERNAL_SERVER_ERROR,
  },
  P2031: {
    // eslint-disable-next-line max-len
    message: 'Prisma needs to perform transactions, which requires your MongoDB server to be run as a replica set. See details: https://pris.ly/d/mongodb-replica-set.',
    httpCode: StatusCodes.INTERNAL_SERVER_ERROR,
  },
  P2033: {
    // eslint-disable-next-line max-len
    message: 'A number used in the query does not fit into a 64 bit signed integer. Consider using BigInt as field type if you\'re trying to store large integers.',
    httpCode: StatusCodes.UNPROCESSABLE_ENTITY,
  },
  P2034: {
    message: 'Transaction failed due to a write conflict or a deadlock. Please retry your transaction.',
    httpCode: StatusCodes.CONFLICT,
  },
};

export function mapPrismaClientErrors(error: unknown): ErrorReturn | unknown {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (PrismaClientErrorMap[error.code]) {
      const mappedError = PrismaClientErrorMap[error.code];
      mappedError.detail = error.message;
      return mappedError;
    }
    throw new Error(`Unknown prisma reference for code ${error.code}`);
  }

  if (error instanceof Prisma.PrismaClientUnknownRequestError) {
    throw new Error('An unknown error has been triggered. Please check the error trace for more information.');
  }
}
