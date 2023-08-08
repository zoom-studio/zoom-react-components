import React from 'react';
import { type MaybeArray } from '@zoom-studio/js-ts-utils';
import { type PopoverNS } from '..';
import { type BaseComponent, type Color as ColorType } from '../../types';
export declare namespace ProgressNS {
    const Types: readonly ["horizontal", "vertical", "circular"];
    type Types = (typeof Types)[number];
    type Color = [ColorType, Record<number | string, ColorType>?];
    type Size = string | number;
    interface Step {
        percentage?: number;
        color?: Color | string;
        withWave?: boolean;
        title?: string;
        popoverProps?: PopoverNS.Props;
    }
    interface CircularProps {
        circularSize?: number;
        circularStroke?: number;
        circularPercentageFontSize?: Size;
        circularIconFontSize?: Size;
    }
    interface VerticalProps {
        verticalHeight?: Size;
        verticalWidth?: Size;
    }
    interface HorizontalProps {
        horizontalWidth?: Size;
        horizontalHeight?: Size;
    }
    interface Props extends Omit<BaseComponent, 'children'>, CircularProps, VerticalProps, HorizontalProps {
        type?: Types;
        steps: MaybeArray<Step>;
        info?: 'percentage' | 'status' | {
            name: 'seconds-left';
            duration: number;
        };
        failed?: boolean;
        dynamicColors?: boolean;
        dynamicInfo?: boolean;
        showInfo?: boolean;
        transition?: string;
    }
}
export declare const Progress: React.ForwardRefExoticComponent<ProgressNS.Props & React.RefAttributes<HTMLDivElement>>;
