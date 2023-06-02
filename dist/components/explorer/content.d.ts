import { type FC } from 'react';
import { type AlertNS, type ExplorerNS } from '..';
import { type UseExplorerI18nNS } from './use-i18n';
export declare namespace ExplorerContentNS {
    interface Props extends Pick<ExplorerNS.Props, 'filterTypes' | 'disabled'> {
        selectable: boolean;
        files: ExplorerNS.FileInterface[];
        multiSelect: boolean;
        typeColors: ExplorerNS.TypeColors;
        selectedFiles: number[];
        alert?: AlertNS.Props;
        i18n: Required<UseExplorerI18nNS.I18n>;
        loading?: boolean;
        onSelectionChange: (selectedIndexes: number[]) => void;
        openRenameModal: (selectedFile: ExplorerNS.FileInterface) => () => void;
    }
}
export declare const ExplorerContent: FC<ExplorerContentNS.Props>;
