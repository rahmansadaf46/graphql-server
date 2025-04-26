import { nodeObjects } from '../data';
import { ValidationError } from '../utils/errors';
import { NodeObject, Context } from '../types';
import { logger } from '../utils/logger';

/**
 * Resolvers for Query type
 */
export const queryResolvers = {
  /**
   * Fetch a node by ID or return the first node if no ID is provided
   * @param nodeId - Optional ID of the node
   * @returns NodeObject or null
   */
  node: (_: unknown, { nodeId }: { nodeId?: string }, { isAuthenticated }: Context): NodeObject | null => {
    if (!isAuthenticated) {
      logger.warn('Unauthorized access attempt to node query');
      throw new Error('Unauthorized');
    }

    if (nodeId && !/^[a-zA-Z0-9-]+$/.test(nodeId)) {
      logger.error(`Invalid nodeId: ${nodeId}`);
      throw new ValidationError('Invalid nodeId format');
    }

    logger.info(`Fetching node with ID: ${nodeId || 'first node'}`);
    return nodeId
      ? nodeObjects.find((node) => node._id === nodeId) || null
      : nodeObjects[0] || null;
  },
};