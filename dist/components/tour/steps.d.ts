import { FC, MutableRefObject } from 'react';
import { TourNS } from '.';
export declare namespace StepsNS {
    interface Props extends Omit<TourNS.Props, 'children'> {
        startTourRef: MutableRefObject<null | TourNS.ChildrenCallbackParams['startTour']>;
        stopTourRef: MutableRefObject<null | TourNS.ChildrenCallbackParams['stopTour']>;
        navigateToRef: MutableRefObject<null | TourNS.ChildrenCallbackParams['navigateTo']>;
    }
}
export declare const Steps: FC<StepsNS.Props>;
