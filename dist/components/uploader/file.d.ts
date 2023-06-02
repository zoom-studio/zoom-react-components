import { type FC } from 'react';
import { type ExplorerNS, type UploaderNS } from '..';
import { type UseUploaderI18nNS } from './use-i18n';
export declare namespace UploaderFileNS {
    interface Props extends UploaderNS.FileInterface, Pick<UploaderNS.Props, 'onRemove' | 'isRemovingFile'> {
        typeColors: ExplorerNS.TypeColors;
        isRTL: boolean;
        i18n: Required<UseUploaderI18nNS.I18n>;
        index: number;
    }
}
export declare const UploaderFile: FC<UploaderFileNS.Props>;
