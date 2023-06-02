import React from 'react';
import { type MaybeString } from '@zoom-studio/zoom-js-ts-utils';
import { type AlertNS, type ImageEditorNS, type InfiniteScrollViewNS, type UploaderDialogNS, type UploaderNS } from '..';
import { type BaseComponent } from '../../types';
import { type UseExplorerI18nNS } from './use-i18n';
export declare namespace ExplorerNS {
    const VIEW_MODE_STORE_KEY = "zoomrc-explorer-view-mode";
    const ImageType: readonly ["png", "jpg", "jpeg", "webp"];
    type ImageType = (typeof ImageType)[number];
    type MaybeImageType = MaybeString<ImageType>;
    const VideoType: readonly ["webm", "mkv", "ogg", "avi", "mov", "amv", "mp4", "3gp"];
    type VideoType = (typeof VideoType)[number];
    type MaybeVideoType = MaybeString<VideoType>;
    const FileType: readonly ["png", "jpg", "jpeg", "webp", "webm", "mkv", "ogg", "avi", "mov", "amv", "mp4", "3gp", "pdf"];
    type FileType = (typeof FileType)[number];
    type MaybeFileType = MaybeString<FileType>;
    const NotPreviewedKnownFileType: readonly ["unknowns", "docx", "pdf", "xls", "mp4", "ppt", "eps", "psd", "avi", "mov", "html", "css", "mp3", "wav", "zip", "txt"];
    type NotPreviewedKnownFileType = (typeof NotPreviewedKnownFileType)[number];
    type MaybeNotPreviewedKnownFileType = MaybeString<NotPreviewedKnownFileType>;
    const AllFileTypes: readonly ["png", "jpg", "jpeg", "webp", "webm", "mkv", "ogg", "avi", "mov", "amv", "mp4", "3gp", "pdf", "unknowns", "docx", "pdf", "xls", "mp4", "ppt", "eps", "psd", "avi", "mov", "html", "css", "mp3", "wav", "zip", "txt"];
    type AllFileTypes = (typeof AllFileTypes)[number];
    type MaybeAllFileTypes = MaybeString<AllFileTypes>;
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
    type InfiniteScrollProps = Omit<InfiniteScrollViewNS.Props, 'dataset' | 'children' | 'maxHeight'>;
    interface Props extends Omit<BaseComponent, 'children'> {
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
        i18n?: I18n;
        onDeleteFiles?: (fileIDs: ID[], closePopConfirm: () => void, clearSelectedFiles: () => void) => void;
        onRenameFile?: (fileID: ID, newName: string, closeModal: () => void) => void;
        onSearch?: (parameters: Partial<SearchParameters>) => void;
        onEditImage?: (imageID: ID, newImageResult: ImageEditorNS.ResultType | undefined, closeModal: () => void) => void;
        onSelectItems?: (selectedIndexes: number[]) => void;
    }
}
export declare const Explorer: React.ForwardRefExoticComponent<ExplorerNS.Props & React.RefAttributes<HTMLDivElement>>;
