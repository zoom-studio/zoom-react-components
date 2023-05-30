import React from 'react';
import { type MaybeString } from '@zoom-studio/zoom-js-ts-utils';
import { ExplorerNS, type TypographyNS } from '..';
import { type BaseComponent, type DataEntriesState } from '../../types';
import { type UseUploaderI18nNS } from './use-i18n';
export declare namespace UploaderNS {
    type I18n = UseUploaderI18nNS.I18n;
    const AcceptableTypes: readonly ["audio/*", "video/*", "image/*"];
    type AcceptableTypes = (typeof AcceptableTypes)[number];
    type MaybeAcceptableTypes = MaybeString<AcceptableTypes>;
    interface FileInterface {
        name: string;
        type: ExplorerNS.MaybeAllFileTypes;
        size: number;
        percentage?: number;
        imageSource?: string | null;
    }
    interface Props extends Omit<BaseComponent, 'children'> {
        title?: string;
        description?: string;
        typeColors?: Partial<ExplorerNS.TypeColors>;
        accept?: MaybeAcceptableTypes;
        disabled?: boolean;
        loading?: boolean;
        maxFiles?: number;
        onWrite?: (files: File[]) => void;
        onRemove?: (fileIndex: number, closePopConfirm: () => void) => void;
        state?: DataEntriesState;
        i18n?: I18n;
        disabledOnLoading?: boolean;
        files?: (FileInterface | File)[];
        stateMessageProps?: TypographyNS.TextNS.Props;
        isRemovingFile?: boolean;
    }
}
export declare const Uploader: React.ForwardRefExoticComponent<UploaderNS.Props & React.RefAttributes<HTMLDivElement>>;
