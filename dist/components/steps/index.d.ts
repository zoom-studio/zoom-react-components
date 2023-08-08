import React, { type MouseEvent, type ReactNode } from 'react';
import { type BaseComponent } from '../../types';
export declare namespace StepsNS {
    interface Step {
        title?: ReactNode;
        description?: ReactNode;
        loading?: boolean;
        progress?: number;
        disabled?: boolean;
        onClick?: (evt: MouseEvent<HTMLDivElement>) => void;
    }
    interface Props extends Omit<BaseComponent, 'children'> {
        steps: Step[];
        currentStepIndex?: number;
        disabled?: boolean;
    }
}
export declare const Steps: React.ForwardRefExoticComponent<StepsNS.Props & React.RefAttributes<HTMLDivElement>>;
