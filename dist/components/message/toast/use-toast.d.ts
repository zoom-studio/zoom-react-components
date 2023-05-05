import { CommonVariants } from '../../../types';
import { ToastNS } from '.';
import { UseMessageNS } from '../use-message';
export declare namespace UseToastNS {
    type ToastOptions = Omit<ToastNS.Props, 'variant' | 'message' | 'thisToast'>;
    type ToastCreator = (message: string, variant: CommonVariants, opt?: ToastOptions) => string;
    type SimplifiedToastCreator = (message: string, opt?: ToastOptions) => string;
    interface UseToastReturnType extends UseMessageNS.WithVariantCreator<SimplifiedToastCreator>, UseMessageNS.BaseMessageParams {
        toast: ToastCreator;
    }
}
export declare const useToast: () => UseToastNS.UseToastReturnType;
