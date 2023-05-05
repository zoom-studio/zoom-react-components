import { FC } from 'react';
import { ExplorerNS, UploaderNS } from '..';
import { UseUploaderI18nNS } from './use-i18n';
export declare namespace UploaderFileNS {
    interface Props extends UploaderNS.FileInterface, Pick<UploaderNS.Props, 'onRemove' | 'isRemovingFile'> {
        typeColors: ExplorerNS.TypeColors;
        isRTL: boolean;
        i18n: Required<UseUploaderI18nNS.I18n>;
        index: number;
    }
}
export declare const UploaderFile: FC<UploaderFileNS.Props>;
