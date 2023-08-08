import { type FC } from 'react';
import { Dated } from '@zoom-studio/js-ts-utils';
export declare namespace CurrentTimeNS {
    interface Props {
        dated: Dated;
    }
}
export declare const CurrentTime: FC<CurrentTimeNS.Props>;
