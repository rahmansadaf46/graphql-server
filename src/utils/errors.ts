import { ApolloError } from 'apollo-server-express';

/**
 * Custom error for forbidden actions
 */
export class ForbiddenError extends ApolloError {
  constructor(message: string) {
    super(message, 'FORBIDDEN');
    Object.defineProperty(this, 'name', { value: 'ForbiddenError' });
  }
}

/**
 * Custom error for validation failures
 */
export class ValidationError extends ApolloError {
  constructor(message: string) {
    super(message, 'VALIDATION_ERROR');
    Object.defineProperty(this, 'name', { value: 'ValidationError' });
  }
}