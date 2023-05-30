import { type TimeShiftNS } from '../time-shift';
import { type UseMessageNS } from '../use-message';
export declare namespace UseTimeShiftNS {
    type TimeShiftOptions = Omit<TimeShiftNS.Props, 'onShift' | 'message' | 'onShiftTitle'>;
    type TimeShiftCreator = (message: string, onShiftTitle: string, onShift: TimeShiftNS.Props['onShift'], opt?: TimeShiftOptions) => string;
    interface UseTimeShiftReturnType extends UseMessageNS.BaseMessageParams {
        show: TimeShiftCreator;
    }
}
export declare const useTimeShift: () => UseTimeShiftNS.UseTimeShiftReturnType;
