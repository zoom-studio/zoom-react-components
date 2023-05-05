import { FC } from 'react';
import { MaybeArray } from '@zoom-studio/zoom-js-ts-utils';
export declare namespace ColumnGroupNS {
    interface Props {
        width?: string | number;
        children: MaybeArray<JSX.Element>;
    }
}
export declare const ColumnGroup: FC<ColumnGroupNS.Props>;
