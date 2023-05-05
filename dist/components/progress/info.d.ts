import { FC } from 'react';
import { ProgressNS } from '.';
export declare namespace ProgressInfoNS {
    interface Props extends Pick<ProgressNS.Props, 'info' | 'failed' | 'dynamicColors' | 'dynamicInfo'> {
        percentage: number;
        percentageFontSize: ProgressNS.Size;
        iconsFontsize: ProgressNS.Size;
    }
}
export declare const ProgressInfo: FC<ProgressInfoNS.Props>;
