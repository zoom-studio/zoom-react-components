import React from 'react';
import { AlertNS, ImageEditorNS, UploaderDialogNS, UploaderNS } from '..';
import { BaseComponent } from '../../types';
import { UseExplorerI18nNS } from './use-i18n';
export declare namespace ExplorerNS {
    const VIEW_MODE_STORE_KEY = "zoomrc-explorer-view-mode";
    const ViewMode: readonly ["grid", "row"];
    type ViewMode = typeof ViewMode[number];
    const ImageType: readonly ["png", "jpg", "jpeg", "webp"];
    type ImageType = typeof ImageType[number];
    type MaybeImageType = ImageType | (string & {});
    const VideoType: readonly ["webm", "mkv", "ogg", "avi", "mov", "amv", "mp4", "3gp"];
    type VideoType = typeof VideoType[number];
    type MaybeVideoType = VideoType | (string & {});
    const FileType: readonly ["png", "jpg", "jpeg", "webp", "webm", "mkv", "ogg", "avi", "mov", "amv", "mp4", "3gp", "pdf"];
    type FileType = typeof FileType[number];
    type MaybeFileType = FileType | (string & {});
    const NotPreviewedKnownFileType: readonly ["unknowns", "docx", "pdf", "xls", "mp4", "ppt", "eps", "psd", "avi", "mov", "html", "css", "mp3", "wav", "zip", "txt"];
    type NotPreviewedKnownFileType = typeof NotPreviewedKnownFileType[number];
    type MaybeNotPreviewedKnownFileType = NotPreviewedKnownFileType | (string & {});
    const AllFileTypes: readonly ["png", "jpg", "jpeg", "webp", "webm", "mkv", "ogg", "avi", "mov", "amv", "mp4", "3gp", "pdf", "unknowns", "docx", "pdf", "xls", "mp4", "ppt", "eps", "psd", "avi", "mov", "html", "css", "mp3", "wav", "zip", "txt"];
    type AllFileTypes = typeof AllFileTypes[number];
    type MaybeAllFileTypes = AllFileTypes | (string & {});
    type MaybeAllFileTypesWithAll = MaybeAllFileTypes | 'all';
    type ID = string | number;
    type I18n = UseExplorerI18nNS.I18n;
    interface MoreInfo {
        displayName: string;
        value?: string | number | boolean | undefined;
    }
    interface TypeColorInfo {
        background: string;
        foreground: 'white' | 'black';
    }
    type TypeColors = {
        [key in MaybeNotPreviewedKnownFileType]: TypeColorInfo;
    };
    const DefaultTypeColors: TypeColors;
    interface SearchParameters {
        query: string;
        type: MaybeAllFileTypesWithAll;
    }
    interface FileInterface {
        name: string;
        size: number;
        type: MaybeAllFileTypes;
        id: ID;
        link: string;
        createdAt: string;
        updatedAt: string;
        moreInfo?: MoreInfo[];
    }
    interface UploaderProps extends Omit<UploaderNS.Props, 'title'>, Pick<UploaderDialogNS.Props, 'isUploadingFiles'> {
        handleClearFiles: () => void;
    }
    interface Props extends Omit<BaseComponent, 'children'> {
        viewMode?: ViewMode;
        typeColors?: Partial<TypeColors>;
        filterTypes?: ((file: FileInterface) => boolean) | MaybeAllFileTypes[];
        defaultTypeQuery?: MaybeAllFileTypesWithAll;
        files?: FileInterface[];
        selectable?: boolean;
        multiSelect?: boolean;
        alert?: AlertNS.Props;
        isDeletingFiles?: boolean;
        isRenamingFile?: boolean;
        loading?: boolean;
        disabled?: boolean;
        isTypeSelectDisabled?: boolean;
        isSearchInputDisabled?: boolean;
        isSavingEditedImage?: boolean;
        uploaderProps?: UploaderProps;
        onDeleteFiles?: (fileIDs: ID[], closePopConfirm: () => void, clearSelectedFiles: () => void) => void;
        onRenameFile?: (fileID: ID, newName: string, closeModal: () => void) => void;
        onSearch?: (parameters: Partial<SearchParameters>) => void;
        onEditImage?: (imageID: ID, newImageResult: ImageEditorNS.ResultType | undefined, closeModal: () => void) => void;
        onSelectItems?: (selectedIndexes: number[]) => void;
    }
}
export declare const Explorer: React.ForwardRefExoticComponent<ExplorerNS.Props & React.RefAttributes<HTMLDivElement>>;
