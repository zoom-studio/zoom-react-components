import React, { type FC, type ReactNode, useEffect } from 'react'

import { type Meta } from '@storybook/react'

import { CommonStory, StoryPlayground, WithButtonsStory } from './components'

import { type ButtonNS, useMessage } from '..'

import { TimeShift, type TimeShiftNS } from '../components/message/time-shift'
import { type UseTimeShiftNS } from '../components/message/time-shift/use-time-shift'
import { useI18n } from './hooks/use-i18n'
import { DEFAULT_TIME_SHIFT_DURATION } from '../components/message/constants'

const SOUND = 'https://soundbible.com/mp3/Music_Box-Big_Daddy-1389738694.mp3'

interface TimeShiftStoryProps {
  children?: (timeShift: UseTimeShiftNS.UseTimeShiftReturnType) => ReactNode
  creator?: (timeShift: UseTimeShiftNS.UseTimeShiftReturnType) => void
  moreButtons?: (timeShift: UseTimeShiftNS.UseTimeShiftReturnType) => ButtonNS.Props[]
  onMount?: (timeShift: UseTimeShiftNS.UseTimeShiftReturnType) => void
  defaultButtons?: {
    pushNew?: boolean
    destroyAll?: boolean
    terminateAll?: boolean
  }
}
const TimeShiftStory: FC<TimeShiftStoryProps> = ({
  defaultButtons = { destroyAll: true, pushNew: true, terminateAll: true },
  ...props
}) => {
  const { timeShift } = useMessage()
  const buttons: ButtonNS.Props[] = props.moreButtons?.(timeShift) ?? []
  if (defaultButtons?.pushNew) {
    buttons.push({ children: 'Push', onClick: () => props.creator?.(timeShift) })
  }
  if (defaultButtons?.destroyAll) {
    buttons.push({ children: 'Destroy all', onClick: timeShift.destroyAll })
  }
  if (defaultButtons?.terminateAll) {
    buttons.push({ children: 'Terminate all', onClick: timeShift.terminateAll })
  }
  useEffect(() => {
    timeShift.terminateAll()
    props.onMount?.(timeShift)
  }, [])
  return <WithButtonsStory buttons={buttons}>{props.children?.(timeShift)}</WithButtonsStory>
}

export default {
  title: 'Feedback/Time shift',
  component: TimeShift,
  args: {
    onShiftTitle: 'Undo',
    closable: true,
    customSound: undefined,
    duration: 15000,
    id: undefined,
    message: 'Hey there, Undo this action',
    moreActions: [],
    onShift: () => {
      alert('Shifted')
    },
    playSound: true,
  },
} as Meta<typeof TimeShift>

const useTimeShiftStory = () => {
  const { t } = useI18n('timeShift')
  const { toast } = useMessage()

  const message = t('message')
  const undo = t('undo')
  const action1 = t('action1')
  const action2 = t('action2')
  const action3 = t('action3')

  const onShift: TimeShiftNS.Props['onShift'] = destroy => {
    toast.success(t('onShift'), { playSound: true })
    destroy()
  }
  return { message, undo, onShift, action1, action2, action3 }
}

export const Basic: FC = () => {
  const { message, onShift, undo } = useTimeShiftStory()
  const createTimeShifts = (timeShift: UseTimeShiftNS.UseTimeShiftReturnType) => {
    timeShift.show(message, undo, onShift)
  }

  return (
    <TimeShiftStory creator={createTimeShifts} onMount={createTimeShifts}>
      {() => (
        <CommonStory
          component={TimeShift}
          stories={[{ group: [{ props: { message, onShift, onShiftTitle: undo } }] }]}
        />
      )}
    </TimeShiftStory>
  )
}

export const WithMoreActions: FC = () => {
  const { message, onShift, undo, action1, action2 } = useTimeShiftStory()

  const moreActions: ButtonNS.Props[] = [
    { children: action1, variant: 'info' },
    { children: action2, variant: 'neutral' },
  ]

  const createTimeShifts = (timeShift: UseTimeShiftNS.UseTimeShiftReturnType) => {
    timeShift.show(message, undo, onShift, { moreActions })
  }

  return (
    <TimeShiftStory creator={createTimeShifts} onMount={createTimeShifts}>
      {() => (
        <CommonStory
          component={TimeShift}
          stories={[{ group: [{ props: { message, onShift, onShiftTitle: undo, moreActions } }] }]}
        />
      )}
    </TimeShiftStory>
  )
}

export const Closable: FC = () => {
  const { message, onShift, undo } = useTimeShiftStory()

  const createTimeShifts = (timeShift: UseTimeShiftNS.UseTimeShiftReturnType) => {
    timeShift.show(message, undo, onShift, { closable: true })
    timeShift.show(message, undo, onShift, { closable: false })
  }

  return (
    <TimeShiftStory creator={createTimeShifts} onMount={createTimeShifts}>
      {() => (
        <CommonStory
          component={TimeShift}
          stories={[
            {
              group: [
                {
                  name: 'Closable (Default)',
                  props: { message, onShift, onShiftTitle: undo, closable: true },
                },
                {
                  name: 'Node-closable',
                  props: { message, onShift, onShiftTitle: undo, closable: false },
                },
              ],
            },
          ]}
        />
      )}
    </TimeShiftStory>
  )
}

export const Duration: FC = () => {
  const { message, onShift, undo } = useTimeShiftStory()

  const createTimeShifts = (timeShift: UseTimeShiftNS.UseTimeShiftReturnType) => {
    timeShift.show(message, undo, onShift)
    timeShift.show(message, undo, onShift, { duration: 30000 })
  }

  return (
    <TimeShiftStory creator={createTimeShifts} onMount={createTimeShifts}>
      {() => (
        <CommonStory
          component={TimeShift}
          stories={[
            {
              group: [
                {
                  name: `${DEFAULT_TIME_SHIFT_DURATION / 1000} (Default)`,
                  props: { message, onShift, onShiftTitle: undo },
                },
                {
                  name: '30 seconds (Custom)',
                  props: { message, onShift, onShiftTitle: undo, duration: 30000 },
                },
              ],
            },
          ]}
        />
      )}
    </TimeShiftStory>
  )
}

export const WithoutSound: FC = () => {
  const { message, onShift, undo } = useTimeShiftStory()

  const createTimeShifts = (timeShift: UseTimeShiftNS.UseTimeShiftReturnType) => {
    timeShift.show(message, undo, onShift, { playSound: false })
  }

  return (
    <TimeShiftStory creator={createTimeShifts} onMount={createTimeShifts}>
      {() => (
        <CommonStory
          component={TimeShift}
          stories={[
            { group: [{ props: { message, onShift, onShiftTitle: undo, playSound: false } }] },
          ]}
        />
      )}
    </TimeShiftStory>
  )
}

export const CustomSound: FC = () => {
  const { message, onShift, undo } = useTimeShiftStory()

  const createTimeShifts = (timeShift: UseTimeShiftNS.UseTimeShiftReturnType) => {
    timeShift.show(message, undo, onShift, { customSound: SOUND })
  }

  return (
    <TimeShiftStory creator={createTimeShifts} onMount={createTimeShifts}>
      {() => (
        <CommonStory
          component={TimeShift}
          stories={[
            { group: [{ props: { message, onShift, onShiftTitle: undo, customSound: SOUND } }] },
          ]}
        />
      )}
    </TimeShiftStory>
  )
}

export const UpdateExistTimeShift: FC = () => {
  const { message, onShift, undo } = useTimeShiftStory()

  const reset = (timeShift: UseTimeShiftNS.UseTimeShiftReturnType) => {
    timeShift.show(message, undo, onShift, {
      id: 'my-time-shift',
      closable: true,
    })
  }
  const update = (timeShift: UseTimeShiftNS.UseTimeShiftReturnType) => {
    timeShift.show(message, undo, onShift, {
      id: 'my-time-shift',
      closable: false,
    })
  }
  return (
    <TimeShiftStory
      onMount={reset}
      defaultButtons={{}}
      moreButtons={timeShift => [
        {
          onClick: () => {
            reset(timeShift)
          },
          children: 'Push new or reset to default',
        },
        {
          onClick: () => {
            update(timeShift)
          },
          children: 'Push new or update the exist',
        },
      ]}
    >
      {() => (
        <CommonStory
          component={TimeShift}
          stories={[
            {
              group: [
                {
                  name: 'Closable',
                  props: { message, onShift, onShiftTitle: undo, closable: true },
                },
                {
                  name: 'None-closable',
                  props: { message, onShift, onShiftTitle: undo, closable: false },
                },
              ],
            },
          ]}
        />
      )}
    </TimeShiftStory>
  )
}

export const Playground: FC<TimeShiftNS.Props> = props => {
  const handleCreateTimeShift = (timeShift: UseTimeShiftNS.UseTimeShiftReturnType) => {
    timeShift.show(
      props.message,
      props.onShiftTitle,
      () => {
        alert('Shifted')
      },
      { ...props },
    )
  }
  return (
    <TimeShiftStory creator={handleCreateTimeShift} onMount={handleCreateTimeShift}>
      {() => <StoryPlayground component={TimeShift} props={props} />}
    </TimeShiftStory>
  )
}
