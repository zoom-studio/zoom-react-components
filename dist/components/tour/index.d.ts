import { FC, MutableRefObject, ReactNode, RefObject } from 'react';
import { EmojiNS, IconNS } from '..';
import { BaseComponent } from '../../types';
export declare namespace TourNS {
    type Reference = RefObject<HTMLElement | null> | MutableRefObject<HTMLElement | null>;
    const StepPosition: readonly ["top-end", "top-center", "top-start", "center-end", "center", "center-start", "bottom-end", "bottom-center", "bottom-start"];
    type StepPosition = typeof StepPosition[number];
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
    }
    interface I18n {
        nextButton?: string;
        backButton?: string;
        skipButton?: string;
        finishButton?: string;
    }
}
export declare const Tour: FC<TourNS.Props>;
