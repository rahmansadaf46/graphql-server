import { readFileSync } from 'fs';
import { join } from 'path';
import { Action, Trigger, Response, ResourceTemplate, NodeObject } from '../types';

/**
 * Load JSON data sources
 */
export const actions: Action[] = JSON.parse(readFileSync(join(__dirname, 'actions.json'), 'utf8'));
export const triggers: Trigger[] = JSON.parse(readFileSync(join(__dirname, 'triggers.json'), 'utf8'));
export const responses: Response[] = JSON.parse(readFileSync(join(__dirname, 'responses.json'), 'utf8'));
export const resourceTemplates: ResourceTemplate[] = JSON.parse(readFileSync(join(__dirname, 'resourceTemplates.json'), 'utf8'));
export const nodeObjects: NodeObject[] = JSON.parse(readFileSync(join(__dirname, 'nodeObjects.json'), 'utf8'));