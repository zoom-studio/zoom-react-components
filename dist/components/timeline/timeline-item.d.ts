import { type FC } from 'react';
import { type TimelineNS } from '.';
export declare namespace TimelineItemNS {
    interface Props extends Pick<TimelineNS.Props, 'stateMessageProps' | 'inProgressIndex' | 'continues'> {
        item: TimelineNS.Item;
        index: number;
    }
}
export declare const TimelineItem: FC<TimelineItemNS.Props>;
