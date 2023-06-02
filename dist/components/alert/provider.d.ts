import React, { type FC, type ReactNode } from 'react';
import { type AlertNS } from '.';
export declare namespace AlertProviderNS {
    type Alert = AlertNS.Identifier;
    interface ProviderValue {
        alerts?: Alert[];
        isOpen?: (alert: Alert) => boolean;
        destroy?: (alert: Alert) => void;
        show?: (alert: Alert) => void;
    }
    interface Props {
        children: ReactNode;
    }
}
declare const AlertContext: React.Context<AlertProviderNS.ProviderValue>;
export declare const AlertProvider: FC<AlertProviderNS.Props>;
export { AlertContext as alertContext };
