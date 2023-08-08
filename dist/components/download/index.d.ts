import { type FC, type ReactNode } from 'react';
import { type UseDownloadNS } from '@zoom-studio/js-ts-utils';
export declare namespace DownloadNS {
    interface ChildrenCallbackParams {
        total: number;
        received: number;
        progress: number;
        isDownloading: boolean;
        startDownload: () => void;
    }
    interface Props extends UseDownloadNS.Params {
        children?: (params: ChildrenCallbackParams) => ReactNode;
    }
}
export declare const Download: FC<DownloadNS.Props>;
