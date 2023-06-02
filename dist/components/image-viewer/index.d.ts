import React, { type ReactElement, type ReactNode } from 'react';
import { type IReactToPrintProps } from 'react-to-print';
import { type BaseComponent } from '../../types';
import { type UseImageViewerI18nNS } from './use-i18n';
export declare namespace ImageViewerNS {
    interface ChildrenCallbackParams {
        openImageViewer: () => void;
    }
    type ZoomTypes = 'in' | 'out' | 'handy';
    type NavigateTypes = 'forward' | 'backward';
    interface Image {
        source: string;
        name: string;
    }
    type I18n = UseImageViewerI18nNS.I18n;
    interface PrintSettings extends Omit<IReactToPrintProps, 'content' | 'onBeforePrint'> {
        content: (activeImage: Image) => ReactElement;
    }
    interface Props extends Omit<BaseComponent, 'children'> {
        children: (args: ChildrenCallbackParams) => ReactNode;
        printSettings?: PrintSettings;
        images: Image[];
        showPrint?: boolean;
        showDownload?: boolean;
        showDelete?: boolean;
        showSlides?: boolean;
        showName?: boolean;
        showCounter?: boolean;
        showZoomControls?: boolean;
        defaultActiveImageIndex?: number;
        confirmBeforeDelete?: boolean;
        isDeleting?: boolean;
        onWillPrint?: () => void;
        onWillDownload?: () => void;
        onWillZoom?: (type: ZoomTypes) => void;
        onDelete?: () => void;
        onWillNavigate?: (type: NavigateTypes) => void;
        onWillClose?: () => void;
        onWillDoubleClick?: () => void;
        i18n?: I18n;
    }
}
export declare const ImageViewer: React.ForwardRefExoticComponent<ImageViewerNS.Props & React.RefAttributes<HTMLDivElement>>;
