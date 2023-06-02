import { type FC } from 'react';
import { type useRichTextEditorI18n } from '../../use-i18n';
export declare namespace TableInserterPopoverNS {
    interface Props {
        closePopover: () => void;
        onSelect: (cols: number, rows: number) => void;
        i18n: ReturnType<typeof useRichTextEditorI18n>;
    }
}
export declare const TableInserterPopover: FC<TableInserterPopoverNS.Props>;
