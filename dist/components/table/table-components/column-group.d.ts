import { type FC } from 'react';
import { type MaybeArray } from '@zoom-studio/js-ts-utils';
export declare namespace ColumnGroupNS {
    interface Props {
        width?: string | number;
        children: MaybeArray<JSX.Element>;
    }
}
export declare const ColumnGroup: FC<ColumnGroupNS.Props>;
