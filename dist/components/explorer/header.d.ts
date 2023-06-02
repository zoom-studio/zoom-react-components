import { type FC } from 'react';
import { type UseObjectedStateNS } from '@zoom-studio/zoom-js-ts-utils';
import { type ExplorerNS } from '.';
export declare namespace ExplorerHeaderNS {
    interface Props extends Pick<ExplorerNS.Props, 'isSearchInputDisabled' | 'isTypeSelectDisabled' | 'disabled' | 'defaultTypeQuery'> {
        i18n: Required<ExplorerNS.I18n>;
        typeQuery: UseObjectedStateNS.ReturnType<ExplorerNS.MaybeAllFileTypesWithAll>;
        searchQuery: UseObjectedStateNS.ReturnType<string>;
        openUploaderDialog: () => void;
    }
}
export declare const ExplorerHeader: FC<ExplorerHeaderNS.Props>;
