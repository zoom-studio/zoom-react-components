import React from 'react';
import { type Toast as TimeShiftType } from 'react-hot-toast';
import { type ButtonNS } from '../..';
export declare namespace TimeShiftNS {
    interface Props {
        message: string;
        onShift: (destroy: () => void, timeShiftId: string) => void;
        onShiftTitle: string;
        onShiftButtonsProps?: ButtonNS.Props;
        moreActions?: ButtonNS.Props[];
        duration?: number;
        id?: string;
        closable?: boolean;
        thisTimeShift?: TimeShiftType;
        playSound?: boolean;
        customSound?: string;
    }
}
export declare const TimeShift: React.ForwardRefExoticComponent<TimeShiftNS.Props & React.RefAttributes<HTMLDivElement>>;
