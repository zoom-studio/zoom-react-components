import React, { type ComponentProps, type MutableRefObject } from 'react';
import { CircleStencil, type RawAspectRatio } from 'react-advanced-cropper';
import { type BaseComponent } from '../../types';
import { type UseImageEditorI18nNS } from './use-i18n';
export declare namespace ImageEditorNS {
    const EditorMode: readonly ["crop", "saturation", "brightness", "contrast", "hue"];
    type EditorMode = (typeof EditorMode)[number];
    const Flip: readonly ["flipVertically", "flipHorizontally"];
    type Flip = (typeof Flip)[number];
    const Rotate: readonly ["rotateRight", "rotateLeft"];
    type Rotate = (typeof Rotate)[number];
    type I18n = UseImageEditorI18nNS.I18n;
    type Filter = Exclude<EditorMode, 'crop'>;
    type Handlers = ComponentProps<typeof CircleStencil>['handlers'] | boolean;
    type Adjustments = {
        [key in Filter]: number;
    };
    type Flips = {
        [keu in Flip]?: boolean;
    };
    interface ResultType {
        blobURL: string;
        file: File;
        base64: string;
    }
    type GetResult = () => Promise<ResultType | undefined>;
    const DEFAULT_ADJUSTMENTS: Adjustments;
    interface Props extends Omit<BaseComponent, 'children'> {
        src: string;
        circleStencil?: boolean;
        aspectRatio?: RawAspectRatio;
        grid?: boolean;
        confirmBeforeReset?: boolean;
        showPreview?: boolean;
        getResultRef?: MutableRefObject<GetResult | null | undefined>;
        onGettingResultStart?: () => void;
        onGettingResultEnd?: () => void;
        showReset?: boolean;
        defaultAdjustments?: Partial<Adjustments>;
        defaultRotation?: number;
        defaultFlips?: Flips;
        loading?: boolean;
        disabled?: boolean;
        i18n?: I18n;
    }
}
export declare const ImageEditor: React.ForwardRefExoticComponent<ImageEditorNS.Props & React.RefAttributes<HTMLDivElement>>;
