import { type FC, type ReactNode } from 'react';
export declare namespace PortalNS {
    interface Props {
        children?: ReactNode;
        container?: Element | DocumentFragment | null | undefined;
    }
}
export declare const Portal: FC<PortalNS.Props>;
