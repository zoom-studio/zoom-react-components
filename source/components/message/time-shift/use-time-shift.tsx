import React from 'react'

import toaster from 'react-hot-toast'
import { useAudio, type UseAudioNS } from '@zoom-studio/js-ts-utils'

import { TimeShift, type TimeShiftNS } from '../time-shift'
import { DEFAULT_TIME_SHIFT_DURATION, TOASTER_CLASS_NAME } from '../constants'
import { type UseMessageNS } from '../use-message'

export namespace UseTimeShiftNS {
  export type TimeShiftOptions = Omit<TimeShiftNS.Props, 'onShift' | 'message' | 'onShiftTitle'>

  export type TimeShiftCreator = (
    message: string,
    onShiftTitle: string,
    onShift: TimeShiftNS.Props['onShift'],
    opt?: TimeShiftOptions,
  ) => string

  export interface UseTimeShiftReturnType extends UseMessageNS.BaseMessageParams {
    show: TimeShiftCreator
  }
}

export const useTimeShift = (): UseTimeShiftNS.UseTimeShiftReturnType => {
  const { playAudio } = useAudio()

  const handlePlaySound = (toastOptions?: UseTimeShiftNS.TimeShiftOptions) => {
    const isWithSound = toastOptions?.playSound ?? true

    if (!isWithSound) {
      return null
    }

    let sound: UseAudioNS.Audios = ''

    if (toastOptions?.customSound) {
      sound = toastOptions.customSound
    } else {
      sound = 'timeShift'
    }

    void playAudio(sound)
  }

  const timeShift: UseTimeShiftNS.TimeShiftCreator = (message, onShiftTitle, onShift, options) => {
    handlePlaySound(options)
    return toaster(
      t => (
        <TimeShift
          onShiftTitle={onShiftTitle}
          message={message}
          onShift={onShift}
          thisTimeShift={t}
          {...options}
        />
      ),
      {
        duration: options?.duration ?? DEFAULT_TIME_SHIFT_DURATION,
        id: options?.id,
        className: TOASTER_CLASS_NAME,
        position: 'bottom-center',
      },
    )
  }

  return {
    show: timeShift,
    destroy: id => {
      toaster.dismiss(id)
    },
    destroyAll: () => {
      toaster.dismiss()
    },
    terminate: id => {
      toaster.remove(id)
    },
    terminateAll: () => {
      toaster.remove()
    },
  }
}
