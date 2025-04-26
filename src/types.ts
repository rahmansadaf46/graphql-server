export interface Action {
    _id: string;
    createdAt: number;
    updatedAt?: number;
    name: string;
    description?: string;
    functionString?: string | null;
    resourceTemplateId?: string;
    params?: any;
  }
  
  export interface Trigger {
    _id: string;
    createdAt: number;
    updatedAt?: number;
    name: string;
    description?: string;
    functionString?: string | null;
    resourceTemplateId?: string;
    params?: any;
  }
  
  export interface Response {
    _id: string;
    createdAt: number;
    updatedAt?: number;
    name: string;
    description?: string;
    platforms?: ResponsePlatform[];
  }
  
  export interface ResponsePlatform {
    integrationId?: string;
    build?: number;
    localeGroups?: ResponseLocaleGroup[];
  }
  
  export interface ResponseLocaleGroup {
    localeGroupId?: string;
    variations?: ResponseVariation[];
  }
  
  export interface ResponseVariation {
    name: string;
    responses?: any;
  }
  
  export interface ResourceTemplate {
    _id: string;
    createdAt?: number;
    updatedAt?: number;
    name: string;
    description?: string;
    schema?: any;
    integrationId?: string;
    functionString?: string;
    key?: string;
  }
  
  export interface NodeObject {
    _id: string;
    createdAt: number;
    updatedAt?: number;
    name: string;
    description?: string;
    parentIds?: string[];
    root?: boolean;
    triggerId?: string;
    responseIds?: string[];
    actionIds?: string[];
    priority?: number;
    compositeId?: string;
    global?: boolean;
    colour?: string;
  }
  
  export interface Context {
    isAuthenticated: boolean;
  }