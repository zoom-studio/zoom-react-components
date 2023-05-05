import React, { MutableRefObject } from 'react';
import { ImageState as AvatarEditorAvatarState } from 'react-avatar-editor';
import { BaseComponent } from '../../types';
export declare namespace AvatarEditorNS {
    enum RotateDir {
        left = 0,
        right = 1
    }
    interface Size {
        width: number;
        height: number;
    }
    type BorderColor = [number, number, number, number?];
    type CrossOrigin = 'anonymous' | 'use-credentials';
    interface AvatarState extends Omit<AvatarEditorAvatarState, 'resource'> {
        backgroundColor: string;
        resource: HTMLImageElement;
    }
    interface ResultType {
        blobURL: string;
        file: File;
        base64: string;
    }
    type GetResult = () => Promise<ResultType | null>;
    interface Props extends Omit<BaseComponent, 'children'> {
        src: string;
        borderRadius?: number;
        borderColor?: BorderColor;
        borderWidth?: number;
        size?: number | Size;
        defaultScale?: number;
        allowScaleOut?: boolean;
        minScaleOut?: number;
        maxScale?: number;
        scaleStep?: number;
        rotateStep?: number;
        noBounds?: boolean;
        crossOrigin?: CrossOrigin;
        getResultRef?: MutableRefObject<GetResult | null | undefined>;
        onGettingResultStart?: () => void;
        onGettingResultEnd?: () => void;
        fitCanvasSize?: boolean;
        loading?: boolean;
    }
}
export declare const AvatarEditor: React.ForwardRefExoticComponent<AvatarEditorNS.Props & React.RefAttributes<HTMLDivElement>>;
