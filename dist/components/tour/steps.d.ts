import { type FC, type MutableRefObject } from 'react';
import { type TourNS } from '.';
export declare namespace StepsNS {
    interface Props extends Omit<TourNS.Props, 'children'> {
        startTourRef: MutableRefObject<null | TourNS.ChildrenCallbackParams['startTour']>;
        stopTourRef: MutableRefObject<null | TourNS.ChildrenCallbackParams['stopTour']>;
        navigateToRef: MutableRefObject<null | TourNS.ChildrenCallbackParams['navigateTo']>;
    }
}
export declare const Steps: FC<StepsNS.Props>;
