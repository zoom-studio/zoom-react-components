import { FC, MouseEvent } from 'react';
export declare namespace ExpandButtonNS {
    interface Props {
        isExpanded: boolean;
        onClick: (evt: MouseEvent<HTMLButtonElement>) => void;
        disabled: boolean;
    }
}
export declare const ExpandButton: FC<ExpandButtonNS.Props>;
