import { resourceTemplates } from '../data';
import { Action } from '../types';
import { logger } from '../utils/logger';

/**
 * Resolvers for Action type
 */
export const actionResolvers = {
  /**
   * Resolve resourceTemplate for an Action
   * @param parent - The parent Action object
   * @returns ResourceTemplate or null
   */
  resourceTemplate: (parent: Action) => {
    if (!parent.resourceTemplateId) return null;
    logger.debug(`Resolving resourceTemplate for action: ${parent._id}`);
    return resourceTemplates.find((rt) => rt._id === parent.resourceTemplateId) || null;
  },
};