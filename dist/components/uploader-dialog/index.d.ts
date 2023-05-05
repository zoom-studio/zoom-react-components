import React from 'react';
import { ButtonNS, DialogNS, UploaderNS } from '..';
export declare namespace UploaderDialogNS {
    const PickedDialogProps: readonly ["isOpen", "onClose", "closable", "title", "cancelButton"];
    type PickedDialogProps = typeof PickedDialogProps[number];
    const OmittedDialogProps: readonly ["actions", "secondaryActions", "size"];
    type OmittedDialogProps = typeof OmittedDialogProps[number];
    interface Props extends UploaderNS.Props, Pick<DialogNS.Props, PickedDialogProps> {
        dialogProps?: Omit<DialogNS.Props, PickedDialogProps | OmittedDialogProps>;
        minFiles?: number;
        confirmButton?: string;
        confirmButtonProps?: ButtonNS.Props;
        isUploadingFiles?: boolean;
    }
}
export declare const UploaderDialog: React.ForwardRefExoticComponent<UploaderDialogNS.Props & React.RefAttributes<HTMLDivElement>>;
