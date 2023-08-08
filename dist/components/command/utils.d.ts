import { type CommandNS } from '.';
export declare const isSection: (item: CommandNS.Item) => item is CommandNS.Section;
export declare const shouldRenderAction: (action: CommandNS.Action, query: string) => boolean;
export declare const makeActionItemId: (actionId: CommandNS.ActionID) => string;
export declare const unmakeActionItemId: (actionId: string) => string;
export declare const extractActions: (items: CommandNS.Item[]) => CommandNS.Action[];
