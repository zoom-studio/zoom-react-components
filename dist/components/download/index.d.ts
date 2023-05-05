import { FC, ReactNode } from 'react';
import { UseDownloadNS } from '@zoom-studio/zoom-js-ts-utils';
export declare namespace DownloadNS {
    interface ChildrenCallbackParams {
        isDownloading: boolean;
        startDownload: () => void;
    }
    interface Props extends UseDownloadNS.Params {
        children?: (params: ChildrenCallbackParams) => ReactNode;
    }
}
export declare const Download: FC<DownloadNS.Props>;
