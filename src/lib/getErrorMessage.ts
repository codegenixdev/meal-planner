import { Prisma } from "@prisma/client";
import { fromError } from "zod-validation-error";

import { ZodError } from "zod";

const PRISMA_ERROR_CODES = new Map<string, string>([
  [
    "P2000",
    "The provided value for the column is too long for the column's type",
  ],
  ["P2001", "The record searched for in the where condition does not exist"],
  ["P2002", "Unique constraint failed"],
  ["P2003", "Foreign key constraint failed"],
  ["P2004", "A constraint failed on the database"],
  [
    "P2005",
    "The value stored in the database for the field is invalid for the field's type",
  ],
  ["P2006", "The provided value for the field is not valid"],
  ["P2007", "Data validation error"],
  ["P2008", "Failed to parse the query"],
  ["P2009", "Failed to validate the query"],
  ["P2010", "Raw query failed"],
  ["P2011", "Null constraint violation"],
  ["P2012", "Missing a required value"],
  ["P2013", "Missing a required argument"],
  [
    "P2014",
    "The change you are trying to make would violate the required relation",
  ],
  ["P2015", "A related record could not be found"],
  ["P2016", "Query interpretation error"],
  [
    "P2017",
    "The records for relation between the parent and child models are not connected",
  ],
  ["P2018", "The required connected records were not found"],
  ["P2019", "Input error"],
  ["P2020", "Value out of range for the type"],
  ["P2021", "The table does not exist in the current database"],
  ["P2022", "The column does not exist in the current database"],
  ["P2023", "Inconsistent column data"],
  ["P2024", "Timed out fetching a new connection from the pool"],
  [
    "P2025",
    "An operation failed because it depends on one or more records that were required but not found",
  ],
  [
    "P2026",
    "The current database provider doesn't support a feature that the query used",
  ],
  ["P2027", "Multiple errors occurred on the database during query execution"],
]);

const getErrorMessage = (error: unknown): string => {
  if (error instanceof ZodError) {
    const message = fromError(error);
    if (message) {
      return message.toString();
    }
  }

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    const errorCode = error.code;
    const message = PRISMA_ERROR_CODES.get(errorCode);

    if (message) {
      return message;
    }

    if (errorCode === "P2002") {
      const field = (error.meta?.target as string[])?.[0] || "field";
      return `A record with this ${field} already exists.`;
    }
  }

  if (error instanceof Prisma.PrismaClientValidationError) {
    return "Invalid data provided.";
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "An unexpected error occurred.";
};

export { getErrorMessage };
