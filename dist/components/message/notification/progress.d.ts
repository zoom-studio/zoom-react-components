import { FC } from 'react';
import { CommonVariants } from '../../../types';
export declare namespace MessageProgressNS {
    interface Props {
        duration: number;
        variant: CommonVariants;
        isPaused: boolean;
    }
}
export declare const MessageProgress: FC<MessageProgressNS.Props>;
