import { type FC, type MouseEvent } from 'react';
import { CommandNS } from '.';
import { type CustomLinkNS } from '../custom-link';
export declare namespace SectionItemNS {
    interface Props {
        section: CommandNS.Section;
        query: string;
        linkComponent: CustomLinkNS.Props['userLink'];
        activeItem: CommandNS.ActionID | null;
        performAction: (action?: CommandNS.Item) => void;
        handleOnMouseEnterAction: (action: CommandNS.Action) => (evt: MouseEvent<HTMLDivElement> | MouseEvent<HTMLAnchorElement>) => void;
    }
}
export declare const SectionItem: FC<SectionItemNS.Props>;
