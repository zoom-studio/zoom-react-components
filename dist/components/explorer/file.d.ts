import { type FC, type MouseEvent } from 'react';
import { type ExplorerNS } from '.';
import { type UseExplorerI18nNS } from './use-i18n';
export declare namespace ExplorerFileNS {
    interface Props extends ExplorerNS.FileInterface {
        isSelected: boolean;
        typeColors: ExplorerNS.TypeColors;
        onClick?: (evt: MouseEvent) => void;
        viewMode: ExplorerNS.ViewMode;
        i18n: Required<UseExplorerI18nNS.I18n>;
        rename: () => void;
    }
}
export declare const ExplorerFile: FC<ExplorerFileNS.Props>;
