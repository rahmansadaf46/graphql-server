import { ForbiddenError } from './errors';
import { logger } from './logger';

/**
 * Authenticate a request based on Bearer token
 * @param authHeader - Authorization header from request
 * @returns boolean indicating if authenticated
 * @throws ForbiddenError if token is invalid
 */
export function authenticate(authHeader: string): boolean {
  const token = authHeader.replace('Bearer ', '');
  if (!token || token !== process.env.AUTH_TOKEN) {
    logger.warn('Invalid or missing token');
    throw new ForbiddenError('Unauthorized: Invalid or missing token');
  }
  return true;
}