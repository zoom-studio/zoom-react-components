import { type CommonVariants } from '../../types'

import { useNotification } from './notification/use-notification'
import { useTimeShift } from './time-shift/use-time-shift'
import { useToast } from './toast/use-toast'

export namespace UseMessageNS {
  export interface BaseMessageParams {
    destroy: (toastId: string) => void
    destroyAll: () => void
    terminate: (toastId: string) => void
    terminateAll: () => void
  }

  export type WithVariantCreator<Creator> = {
    [variant in CommonVariants]: Creator
  }
}

export const useMessage = () => {
  const notify = useNotification()
  const timeShift = useTimeShift()
  const toast = useToast()

  return { toast, notify, timeShift }
}
