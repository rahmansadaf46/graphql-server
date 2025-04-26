import { resourceTemplates } from '../data';
import { Trigger } from '../types';
import { logger } from '../utils/logger';

/**
 * Resolvers for Trigger type
 */
export const triggerResolvers = {
  /**
   * Resolve resourceTemplate for a Trigger
   * @param parent - The parent Trigger object
   * @returns ResourceTemplate or null
   */
  resourceTemplate: (parent: Trigger) => {
    if (!parent.resourceTemplateId) return null;
    logger.debug(`Resolving resourceTemplate for trigger: ${parent._id}`);
    return resourceTemplates.find((rt) => rt._id === parent.resourceTemplateId) || null;
  },
};