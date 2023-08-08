import { type FC, type MouseEvent } from 'react';
import { CommandNS } from '.';
import { type CustomLinkNS } from '../custom-link';
export declare namespace ActionItemNS {
    interface Props {
        action: CommandNS.Action;
        isLastActionInSection?: boolean;
        linkComponent: CustomLinkNS.Props['userLink'];
        performAction: (action?: CommandNS.Item) => void;
        activeItem: CommandNS.ActionID | null;
        handleOnMouseEnterAction: (action: CommandNS.Action) => (evt: MouseEvent<HTMLDivElement> | MouseEvent<HTMLAnchorElement>) => void;
    }
}
export declare const ActionItem: FC<ActionItemNS.Props>;
