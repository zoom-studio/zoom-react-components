import { type FC, type MutableRefObject, type ReactNode, type RefObject } from 'react';
import { type EmojiNS, type IconNS } from '..';
import { type BaseComponent } from '../../types';
import { type UseTourI18nNS } from './use-i18n';
export declare namespace TourNS {
    type Reference = RefObject<HTMLElement | null> | MutableRefObject<HTMLElement | null>;
    const StepPosition: readonly ["top-end", "top-center", "top-start", "center-end", "center", "center-start", "bottom-end", "bottom-center", "bottom-start"];
    type StepPosition = (typeof StepPosition)[number];
    interface ChildrenCallbackParams {
        startTour: () => void;
        stopTour: () => void;
        navigateTo: (to: 'prev' | 'next' | number) => void;
    }
    interface ContentCallbackParams extends Pick<ChildrenCallbackParams, 'stopTour' | 'navigateTo'> {
        currentStep: number;
    }
    interface Step {
        reference: Reference;
        title?: string;
        description?: string;
        emoji?: EmojiNS.Emojis.Names;
        icon?: IconNS.Names;
        content?: (params: ContentCallbackParams) => ReactNode;
        closable?: boolean;
        loading?: boolean;
        onReach?: () => void;
        onClose?: () => void;
        positionOnFocusReference?: 'center' | 'start' | 'end';
        selfPosition?: StepPosition;
    }
    interface Props extends Omit<BaseComponent, 'children' | 'reference'> {
        steps: Step[];
        children: ReactNode | ((params: ChildrenCallbackParams) => ReactNode);
        onStart?: () => void;
        onEnd?: (activeStepIndex: number) => void;
        backdropProps?: BaseComponent;
        defaultActiveStep?: number;
        scrollableContainer?: Reference | HTMLElement | Window;
        fluidContainer?: boolean;
        i18n?: I18n;
    }
    type I18n = UseTourI18nNS.I18n;
}
export declare const Tour: FC<TourNS.Props>;
