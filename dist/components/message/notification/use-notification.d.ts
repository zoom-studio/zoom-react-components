import { type CommonVariants } from '../../../types';
import { type UseMessageNS } from '../use-message';
import { type NotificationNS } from '.';
export declare namespace UseNotificationNS {
    type NotificationOptions = Omit<NotificationNS.Props, 'variant' | 'message' | 'thisNotification' | 'title'>;
    type NotificationCreator = (title: string, message: NotificationNS.Props['message'], variant: CommonVariants, opt?: NotificationOptions) => string;
    type SimplifiedNotificationCreator = (title: string, message: NotificationNS.Props['message'], opt?: NotificationOptions) => string;
    interface UseNotificationReturnType extends UseMessageNS.WithVariantCreator<SimplifiedNotificationCreator>, UseMessageNS.BaseMessageParams {
        notify: NotificationCreator;
    }
}
export declare const useNotification: () => UseNotificationNS.UseNotificationReturnType;
