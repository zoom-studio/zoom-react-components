import { useZoomComponent } from '../../hooks';
export declare namespace UseExplorerI18nNS {
    interface I18n {
        uploadNewFile?: string;
        searchPlaceholder?: string;
        allTypes?: string;
        previewMessage?: string;
        moreThanOneFileSelectedMessage?: string;
        createdAt?: string;
        updatedAt?: string;
        editImage?: string;
        delete?: string;
        rename?: string;
        download?: string;
        saveImage?: string;
        cancelEditingImage?: string;
        imageEditorTitle?: string;
        cancelDelete?: string;
        confirmDelete?: string;
        confirmDeleteTitle?: string;
        confirmDeleteDescription?: string;
        renameDialogTitle?: string;
        cancelRename?: string;
        confirmRename?: string;
        renameFileLabel?: string;
        fileContextMenuDownload?: string;
        fileContextMenuRename?: string;
        loadingFiles?: string;
    }
}
export declare const UseExplorerI18n: (globalI18ns: ReturnType<typeof useZoomComponent>['globalI18ns']) => Required<UseExplorerI18nNS.I18n>;
