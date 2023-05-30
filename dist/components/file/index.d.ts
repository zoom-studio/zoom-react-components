import React from 'react';
import { ExplorerNS } from '../..';
import { type BaseComponent, type CommonSize } from '../../types';
export declare namespace FileNS {
    interface DownloadableSettings {
        percentage: number;
        isDownloaded: boolean;
    }
    interface LinkedSettings {
        openOnNewTab?: boolean;
    }
    interface Props extends Omit<BaseComponent, 'children'> {
        size?: CommonSize;
        fileType: ExplorerNS.MaybeAllFileTypes;
        url: string;
        fileName: string;
        fileSize: number;
        downloadable?: DownloadableSettings | false;
        linked?: LinkedSettings;
        withImageViewer?: boolean;
        typeColors?: Partial<ExplorerNS.TypeColors>;
        autoWidth?: boolean;
        openImageViewerOnClick?: boolean;
    }
}
export declare const File: React.ForwardRefExoticComponent<FileNS.Props & React.RefAttributes<HTMLDivElement>>;
