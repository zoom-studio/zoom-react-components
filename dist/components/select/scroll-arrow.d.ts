import { type FC, type MutableRefObject } from 'react';
export declare namespace ScrollArrowNS {
    type ArrowDir = (typeof ArrowDir)[number];
    const ArrowDir: readonly ["up", "down"];
    type ArrowStatus = (typeof ArrowStatus)[number];
    const ArrowStatus: readonly ["idle", "active"];
    interface Props {
        isPositioned: boolean;
        dir: ArrowDir;
        scrollRef: MutableRefObject<HTMLDivElement | null>;
        scrollTop: number;
        innerOffset: number;
        onScroll: (amount: number) => void;
        onHide: () => void;
    }
}
export declare const ScrollArrow: FC<ScrollArrowNS.Props>;
