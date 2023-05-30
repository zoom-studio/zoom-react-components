import React from 'react';
import { type ButtonNS, type DialogNS, type AvatarEditorNS } from '..';
export declare namespace AvatarEditorDialogNS {
    const PickedDialogProps: readonly ["isOpen", "onClose", "closable", "title", "cancelButton"];
    type PickedDialogProps = (typeof PickedDialogProps)[number];
    const OmittedDialogProps: readonly ["actions", "secondaryActions", "size"];
    type OmittedDialogProps = (typeof OmittedDialogProps)[number];
    interface Props extends AvatarEditorNS.Props, Pick<DialogNS.Props, PickedDialogProps> {
        dialogProps?: Omit<DialogNS.Props, PickedDialogProps | OmittedDialogProps>;
        saveButton?: string;
        saveButtonProps?: ButtonNS.Props;
        onSave?: (result: AvatarEditorNS.ResultType | undefined) => void;
    }
}
export declare const AvatarEditorDialog: React.ForwardRefExoticComponent<AvatarEditorDialogNS.Props & React.RefAttributes<HTMLDivElement>>;
