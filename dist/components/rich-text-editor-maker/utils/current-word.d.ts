import { type RichTextEditorMakerNS } from '../types';
import { type RichUtilsNS } from './rich-utils';
export declare namespace EditorCurrentWordNS {
    interface Params {
        editor: RichTextEditorMakerNS.Editor;
    }
}
export declare class EditorCurrentWord {
    editor: RichTextEditorMakerNS.Editor;
    wordRegExp: RegExp;
    constructor({ editor }: EditorCurrentWordNS.Params);
    private readonly getLeftChar;
    private readonly getRightChar;
    readonly getCurrentWord: () => RichUtilsNS.GetCurrentWordReturnType | null;
}
