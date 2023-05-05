import { FC, MouseEvent } from 'react';
import { ExplorerNS } from '.';
import { UseExplorerI18nNS } from './use-i18n';
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
