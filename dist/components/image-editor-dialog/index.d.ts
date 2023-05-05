import React from 'react';
import { ButtonNS, DialogNS, ImageEditorNS } from '..';
export declare namespace ImageEditorDialogNS {
    const PickedDialogProps: readonly ["isOpen", "onClose", "closable", "title", "cancelButton"];
    type PickedDialogProps = typeof PickedDialogProps[number];
    const OmittedDialogProps: readonly ["actions", "secondaryActions"];
    type OmittedDialogProps = typeof OmittedDialogProps[number];
    interface Props extends ImageEditorNS.Props, Pick<DialogNS.Props, PickedDialogProps> {
        dialogProps?: Omit<DialogNS.Props, PickedDialogProps | OmittedDialogProps>;
        saveButton?: string;
        saveButtonProps?: ButtonNS.Props;
        onSave?: (result: ImageEditorNS.ResultType | undefined) => void;
    }
}
export declare const ImageEditorDialog: React.ForwardRefExoticComponent<ImageEditorDialogNS.Props & React.RefAttributes<HTMLDivElement>>;
