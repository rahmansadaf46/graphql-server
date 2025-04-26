import { nodeObjects, triggers, responses, actions } from '../data';
import { NodeObject } from '../types';
import { logger } from '../utils/logger';

/**
 * Resolvers for NodeObject type
 */
export const nodeObjectResolvers = {
  /**
   * Resolve parents for a NodeObject
   * @param parent - The parent NodeObject
   * @returns Array of parent NodeObjects
   */
  parents: (parent: NodeObject & { parents?: string[] | null }) => {
    if (!parent.parents || !Array.isArray(parent.parents)) return [];
    logger.debug(`Resolving parents for node: ${parent._id}`);
    // Map parents (compositeIds) to NodeObjects by matching compositeId or _id
    return nodeObjects.filter((node) =>
      (parent.parents ?? []).includes(node.compositeId || '') || (parent.parents ?? []).includes(node._id)
    );
  },
  /**
   * Resolve parentIds for a NodeObject
   * @param parent - The parent NodeObject
   * @returns Array of parent IDs
   */
  parentIds: (parent: NodeObject & { parents?: string[] | null }) => {
    if (!parent.parents || !Array.isArray(parent.parents)) return [];
    logger.debug(`Resolving parentIds for node: ${parent._id}`);
    // Return the parents array as parentIds (compositeIds or _ids)
    return parent.parents;
  },
  /**
   * Resolve trigger for a NodeObject
   * @param parent - The parent NodeObject
   * @returns Trigger or null
   */
  trigger: (parent: NodeObject & { trigger?: string | null }) => {
    if (!parent.trigger) return null;
    logger.debug(`Resolving trigger for node: ${parent._id}`);
    return triggers.find((trigger) => trigger._id === parent.trigger) || null;
  },
  /**
   * Resolve triggerId for a NodeObject
   * @param parent - The parent NodeObject
   * @returns Trigger ID or null
   */
  triggerId: (parent: NodeObject & { trigger?: string | null }) => {
    logger.debug(`Resolving triggerId for node: ${parent._id}`);
    return parent.trigger || null;
  },
  /**
   * Resolve responses for a NodeObject
   * @param parent - The parent NodeObject
   * @returns Array of Responses
   */
  responses: (parent: NodeObject & { responses?: string[] | null }) => {
    if (!parent.responses || !Array.isArray(parent.responses)) return [];
    logger.debug(`Resolving responses for node: ${parent._id}`);
    return responses.filter((response) => (parent.responses ?? []).includes(response._id));
  },
  /**
   * Resolve responseIds for a NodeObject
   * @param parent - The parent NodeObject
   * @returns Array of Response IDs
   */
  responseIds: (parent: NodeObject & { responses?: string[] | null }) => {
    if (!parent.responses || !Array.isArray(parent.responses)) return [];
    logger.debug(`Resolving responseIds for node: ${parent._id}`);
    return parent.responses;
  },
  /**
   * Resolve actions for a NodeObject
   * @param parent - The parent NodeObject
   * @returns Array of Actions
   */
  actions: (parent: NodeObject & { postActions?: string[] | null }) => {
    if (!parent.postActions || !Array.isArray(parent.postActions)) return [];
    logger.debug(`Resolving actions for node: ${parent._id}`);
    return actions.filter((action) => (parent.postActions ?? []).includes(action._id));
  },
  /**
   * Resolve actionIds for a NodeObject
   * @param parent - The parent NodeObject
   * @returns Array of Action IDs
   */
  actionIds: (parent: NodeObject & { postActions?: string[] | null }) => {
    if (!parent.postActions || !Array.isArray(parent.postActions)) return [];
    logger.debug(`Resolving actionIds for node: ${parent._id}`);
    return parent.postActions;
  },
};