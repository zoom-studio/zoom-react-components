import React, { type FC, type ReactNode, type Dispatch, type SetStateAction } from 'react';
import { type CustomLinkNS } from '../custom-link';
import { type CommonSize } from '../../types';
export declare namespace ZoomProviderNS {
    const Themes: readonly ["dark", "dark-high-contrast", "light", "light-high-contrast"];
    type Themes = (typeof Themes)[number];
    const Digits: readonly ["farsi", "latin"];
    type Digits = (typeof Digits)[number];
    interface ProviderValue {
        theme?: Themes;
        digits?: Digits;
        isDarwin?: boolean;
        setIsDarwin?: Dispatch<SetStateAction<boolean>>;
        linkComponent?: CustomLinkNS.Props['userLink'];
        isRTL?: boolean;
        defaultComponentsSize?: CommonSize;
    }
    interface Props extends Omit<ProviderValue, 'setIsDarwin'> {
        children?: ReactNode;
        withMessage?: boolean;
        withAlert?: boolean;
    }
}
declare const ZoomContext: React.Context<ZoomProviderNS.ProviderValue>;
export declare const ZoomProvider: FC<ZoomProviderNS.Props>;
export { ZoomContext as zoomContext };
