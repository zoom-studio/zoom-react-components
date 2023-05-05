import { FC } from 'react';
import { UseObjectedStateNS } from '@zoom-studio/zoom-js-ts-utils';
import { ExplorerNS } from '..';
export declare namespace ExplorerSidebarNS {
    interface Props extends Pick<ExplorerNS.Props, 'onEditImage' | 'onDeleteFiles' | 'isSavingEditedImage' | 'isDeletingFiles' | 'isRenamingFile'> {
        i18n: Required<ExplorerNS.I18n>;
        files: ExplorerNS.FileInterface[];
        selectedFiles: UseObjectedStateNS.ReturnType<number[]>;
        typeColors: ExplorerNS.TypeColors;
        handleOpenRenameModal: (selectedFile: ExplorerNS.FileInterface) => () => void;
        disabled?: boolean;
        loading?: boolean;
    }
}
export declare const ExplorerSidebar: FC<ExplorerSidebarNS.Props>;
