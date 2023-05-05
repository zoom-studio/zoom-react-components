import React, { ReactElement, ReactNode } from 'react';
import { IReactToPrintProps } from 'react-to-print';
import { BaseComponent } from '../../types';
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
    interface I18n {
        closeTooltip?: string;
        zoomInTooltip?: string;
        zoomOutTooltip?: string;
        downloadTooltip?: string;
        printTooltip?: string;
        deleteTooltip?: string;
        deletePopConfirmTitle: string;
        deletePopConfirmDescription?: string;
        deletePopConfirmSubmitButton?: string;
        deletePopConfirmCancelButton?: string;
    }
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
    }
}
export declare const ImageViewer: React.ForwardRefExoticComponent<ImageViewerNS.Props & React.RefAttributes<HTMLDivElement>>;
