import { CommonVariants } from '../../types';
export declare namespace UseMessageNS {
    interface BaseMessageParams {
        destroy: (toastId: string) => void;
        destroyAll: () => void;
        terminate: (toastId: string) => void;
        terminateAll: () => void;
    }
    type WithVariantCreator<Creator> = {
        [variant in CommonVariants]: Creator;
    };
}
export declare const useMessage: () => {
    toast: import("./toast/use-toast").UseToastNS.UseToastReturnType;
    notify: import("./notification/use-notification").UseNotificationNS.UseNotificationReturnType;
    timeShift: import("./time-shift/use-time-shift").UseTimeShiftNS.UseTimeShiftReturnType;
};
