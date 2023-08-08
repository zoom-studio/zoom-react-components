import React, { type FC, type MutableRefObject } from 'react';
import type QRCodeStyling from 'qr-code-styling';
import { type QRCodeNS } from '.';
export declare namespace RendererNS {
    interface Props extends Pick<QRCodeNS.Props, 'className' | 'containerProps' | 'id' | 'onClick' | 'style'> {
        qrCodeRef: MutableRefObject<QRCodeStyling | null>;
        reference: React.ForwardedRef<HTMLDivElement>;
    }
}
export declare const Renderer: FC<RendererNS.Props>;
