import { type FC } from 'react';
import { type useMacOSSelect } from './use-mac-os-select';
import { type CommonSize } from '../../types';
export declare namespace OptionsPortalNS {
    interface Props {
        select: ReturnType<typeof useMacOSSelect>;
        children: JSX.Element;
        size: CommonSize;
        showSearch: boolean;
        portalClassName?: string;
    }
}
export declare const OptionsPortal: FC<OptionsPortalNS.Props>;
