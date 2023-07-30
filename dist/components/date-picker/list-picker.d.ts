import React, { type ReactNode } from 'react';
export declare namespace ListPickerNS {
    interface Props<DataType extends unknown[] = unknown[]> {
        dataset: DataType;
        children: (date: DataType[0], index: number) => ReactNode;
        width: number | string;
        title?: string;
    }
}
export declare const ListPicker: <DataType extends unknown[] = unknown[]>({ dataset, children, width, title, }: ListPickerNS.Props<DataType>) => React.JSX.Element;
