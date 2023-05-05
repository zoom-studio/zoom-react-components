import { FC } from 'react';
import { AlertNS, ExplorerNS } from '..';
import { UseExplorerI18nNS } from './use-i18n';
export declare namespace ExplorerContentNS {
    interface Props extends Pick<ExplorerNS.Props, 'filterTypes' | 'disabled'> {
        selectable: boolean;
        files: ExplorerNS.FileInterface[];
        multiSelect: boolean;
        viewMode: ExplorerNS.ViewMode;
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
