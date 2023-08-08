import React, { type ReactNode } from 'react';
import { type CornerDotType, type CornerSquareType, type DotType } from 'qr-code-styling';
import { type BaseComponent } from '../../types';
export declare namespace QRCodeNS {
    interface ChildrenCallbackParams {
        render: () => ReactNode;
        download: () => Promise<void>;
    }
    interface Props extends Omit<BaseComponent<HTMLDivElement>, 'children'> {
        children: (handlers: ChildrenCallbackParams) => ReactNode;
        downloadName?: () => string;
        data: string;
        size?: number;
        logo?: string;
        color?: string;
        cornersDotType?: CornerDotType;
        cornersSquareType?: CornerSquareType;
        dotsType?: DotType;
    }
}
export declare const QRCode: React.ForwardRefExoticComponent<QRCodeNS.Props & React.RefAttributes<HTMLDivElement>>;
