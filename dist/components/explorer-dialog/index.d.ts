import React from 'react';
import { type ButtonNS, type DialogNS, type ExplorerNS } from '..';
export declare namespace ExplorerDialogNS {
    const PickedDialogProps: readonly ["isOpen", "onClose", "closable", "title", "cancelButton"];
    type PickedDialogProps = (typeof PickedDialogProps)[number];
    const OmittedDialogProps: readonly ["actions", "secondaryActions"];
    type OmittedDialogProps = (typeof OmittedDialogProps)[number];
    interface Props extends ExplorerNS.Props, Pick<DialogNS.Props, PickedDialogProps> {
        dialogProps?: Omit<DialogNS.Props, PickedDialogProps | OmittedDialogProps>;
        selectButton?: string;
        selectButtonProps?: ButtonNS.Props;
    }
}
export declare const ExplorerDialog: React.ForwardRefExoticComponent<ExplorerDialogNS.Props & React.RefAttributes<HTMLDivElement>>;
