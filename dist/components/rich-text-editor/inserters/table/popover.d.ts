import { FC } from 'react';
export declare namespace TableInserterPopoverNS {
    interface Props {
        closePopover: () => void;
        onSelect: (cols: number, rows: number) => void;
    }
}
export declare const TableInserterPopover: FC<TableInserterPopoverNS.Props>;
