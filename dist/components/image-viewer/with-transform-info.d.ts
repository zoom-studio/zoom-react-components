import { type FC, type ReactNode } from 'react';
import { type ReactZoomPanPinchContextState } from 'react-zoom-pan-pinch';
export declare namespace WithTransformInfoNS {
    interface Props {
        children: (params: ReactZoomPanPinchContextState | null) => ReactNode;
    }
}
export declare const WithTransformInfo: FC<WithTransformInfoNS.Props>;
