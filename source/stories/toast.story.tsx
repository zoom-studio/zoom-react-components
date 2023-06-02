import React, { type FC, type ReactNode, useEffect } from 'react'

import { type Meta } from '@storybook/react'

import { CommonStory, StoryPlayground, WithButtonsStory } from './components'

import { COMMON_VARIANTS } from '../constants'
import { useI18n } from './hooks/use-i18n'

import { type ButtonNS, useMessage } from '..'

import { DEFAULT_TOAST_DURATION } from '../components/message/constants'
import { Toast, type ToastNS } from '../components/message/toast'
import { type UseToastNS } from '../components/message/toast/use-toast'

const SOUND = 'https://soundbible.com/mp3/Music_Box-Big_Daddy-1389738694.mp3'

interface ToastStoryProps {
  children?: (toast: UseToastNS.UseToastReturnType) => ReactNode
  creator?: (toast: UseToastNS.UseToastReturnType) => void
  moreButtons?: (toast: UseToastNS.UseToastReturnType) => ButtonNS.Props[]
  onMount?: (toast: UseToastNS.UseToastReturnType) => void
  defaultButtons?: {
    pushNew?: boolean
    destroyAll?: boolean
    terminateAll?: boolean
  }
}
const ToastStory: FC<ToastStoryProps> = ({
  defaultButtons = { destroyAll: true, pushNew: true, terminateAll: true },
  ...props
}) => {
  const { toast } = useMessage()
  const buttons: ButtonNS.Props[] = props.moreButtons?.(toast) ?? []
  if (defaultButtons?.pushNew) {
    buttons.push({ children: 'Push', onClick: () => props.creator?.(toast) })
  }
  if (defaultButtons?.destroyAll) {
    buttons.push({ children: 'Destroy all', onClick: toast.destroyAll })
  }
  if (defaultButtons?.terminateAll) {
    buttons.push({ children: 'Terminate all', onClick: toast.terminateAll })
  }
  useEffect(() => {
    toast.terminateAll()
    props.onMount?.(toast)
  }, [])
  return <WithButtonsStory buttons={buttons}>{props.children?.(toast)}</WithButtonsStory>
}

export default {
  title: 'Feedback/Toast',
  component: Toast,
  args: {
    message: 'Hey there',
    duration: 5000,
    closable: true,
    loading: false,
    noIconAndEmoji: false,
    emoji: undefined,
    icon: undefined,
    variant: 'neutral',
  },
} as Meta<typeof Toast>

export const Variants: FC = () => {
  const { t } = useI18n('toast')
  const message = t('message')
  const createToasts = (toast: UseToastNS.UseToastReturnType) => {
    COMMON_VARIANTS.forEach(variant => {
      toast.toast(message, variant)
    })
  }
  return (
    <ToastStory creator={createToasts} onMount={createToasts}>
      {() => (
        <CommonStory
          component={Toast}
          stories={[
            {
              group: [
                { name: 'Neutral (default)', props: { message, variant: 'neutral' } },
                { name: 'Success', props: { message, variant: 'success' } },
                { name: 'Info', props: { message, variant: 'info' } },
                { name: 'Warning', props: { message, variant: 'warning' } },
                { name: 'Error', props: { message, variant: 'error' } },
              ],
            },
          ]}
        />
      )}
    </ToastStory>
  )
}

export const WithSound: FC = () => {
  const { t } = useI18n('toast')
  const message = t('message')
  const createToasts = (toast: UseToastNS.UseToastReturnType) => {
    toast.neutral(t('message'), { playSound: true })
  }
  return (
    <ToastStory creator={createToasts} onMount={createToasts}>
      {() => (
        <CommonStory
          component={Toast}
          stories={[{ group: [{ props: { message, playSound: true } }] }]}
        />
      )}
    </ToastStory>
  )
}

export const CustomSound: FC = () => {
  const { t } = useI18n('toast')
  const message = t('message')
  const createToasts = (toast: UseToastNS.UseToastReturnType) => {
    toast.neutral(t('message'), { playSound: true, customSound: SOUND })
  }
  return (
    <ToastStory creator={createToasts} onMount={createToasts}>
      {() => (
        <CommonStory
          component={Toast}
          stories={[{ group: [{ props: { message, playSound: true, customSound: SOUND } }] }]}
        />
      )}
    </ToastStory>
  )
}

export const Closable: FC = () => {
  const { t } = useI18n('toast')
  const message = t('message')
  const createToasts = (toast: UseToastNS.UseToastReturnType) => {
    toast.toast(t('message'), 'neutral', { closable: true })
    toast.toast(t('message'), 'neutral', { closable: false })
  }
  return (
    <ToastStory creator={createToasts} onMount={createToasts}>
      {() => (
        <CommonStory
          component={Toast}
          stories={[
            {
              group: [
                { name: 'Closable', props: { closable: true, message } },
                { name: 'None closable', props: { closable: false, message } },
              ],
            },
          ]}
        />
      )}
    </ToastStory>
  )
}

export const OmittedIcon: FC = () => {
  const { t } = useI18n('toast')
  const message = t('message')
  const createToasts = (toast: UseToastNS.UseToastReturnType) => {
    COMMON_VARIANTS.forEach(variant => {
      toast.toast(t('message'), variant, { noIconAndEmoji: true })
    })
  }
  return (
    <ToastStory creator={createToasts} onMount={createToasts}>
      {() => (
        <CommonStory
          component={Toast}
          stories={[
            {
              group: [
                { name: 'Neutral', props: { noIconAndEmoji: true, message, variant: 'neutral' } },
                { name: 'Success', props: { noIconAndEmoji: true, message, variant: 'success' } },
                { name: 'Info', props: { noIconAndEmoji: true, message, variant: 'info' } },
                { name: 'Warning', props: { noIconAndEmoji: true, message, variant: 'warning' } },
                { name: 'Error', props: { noIconAndEmoji: true, message, variant: 'error' } },
              ],
            },
          ]}
        />
      )}
    </ToastStory>
  )
}

export const CustomIcon: FC = () => {
  const { t } = useI18n('toast')
  const message = t('message')
  const createToasts = (toast: UseToastNS.UseToastReturnType) => {
    toast.toast(message, 'neutral', { icon: 'hdr_auto_select' })
    toast.toast(message, 'neutral', { emoji: 'heart hands' })
  }
  return (
    <ToastStory creator={createToasts} onMount={createToasts}>
      {() => (
        <CommonStory
          component={Toast}
          stories={[
            {
              group: [
                { name: 'Material icons', props: { message, icon: 'hdr_auto_select' } },
                { name: 'Emoji', props: { message, emoji: 'heart hands' } },
              ],
            },
          ]}
        />
      )}
    </ToastStory>
  )
}

export const LoadingState: FC = () => {
  const { t } = useI18n('toast')
  const message = t('message')
  const createToasts = (toast: UseToastNS.UseToastReturnType) => {
    COMMON_VARIANTS.forEach(variant => {
      toast.toast(message, variant, { loading: true })
    })
  }
  return (
    <ToastStory creator={createToasts} onMount={createToasts}>
      {() => (
        <CommonStory
          component={Toast}
          stories={[
            {
              group: [
                { name: 'Neutral', props: { loading: true, message, variant: 'neutral' } },
                { name: 'Success', props: { loading: true, message, variant: 'success' } },
                { name: 'Info', props: { loading: true, message, variant: 'info' } },
                { name: 'Warning', props: { loading: true, message, variant: 'warning' } },
                { name: 'Error', props: { loading: true, message, variant: 'error' } },
              ],
            },
          ]}
        />
      )}
    </ToastStory>
  )
}

export const UpdateExistToast: FC = () => {
  const { t } = useI18n('toast')
  const message = t('message')
  const reset = (toast: UseToastNS.UseToastReturnType) => {
    toast.toast(message, 'warning', { loading: true, id: 'my-toast', closable: true })
  }
  const update = (toast: UseToastNS.UseToastReturnType) => {
    toast.toast(message, 'success', { loading: false, id: 'my-toast', closable: true })
  }
  return (
    <ToastStory
      onMount={reset}
      defaultButtons={{}}
      moreButtons={toast => [
        {
          onClick: () => {
            reset(toast)
          },
          children: 'Push new or reset to default',
        },
        {
          onClick: () => {
            update(toast)
          },
          children: 'Push new or update the exist',
        },
      ]}
    >
      {() => (
        <CommonStory
          component={Toast}
          stories={[
            {
              group: [
                {
                  name: 'Warning and loading',
                  props: { message, loading: true, closable: true, variant: 'warning' },
                },
                {
                  name: 'Success',
                  props: { message, loading: false, variant: 'success', closable: true },
                },
              ],
            },
          ]}
        />
      )}
    </ToastStory>
  )
}

export const Duration: FC = () => {
  const { t } = useI18n('toast')
  const message = t('message')
  const createToasts = (toast: UseToastNS.UseToastReturnType) => {
    toast.warning(message)
    toast.error(message, { duration: 1000 })
  }
  return (
    <ToastStory creator={createToasts} onMount={createToasts}>
      {() => (
        <CommonStory
          component={Toast}
          stories={[
            {
              group: [
                {
                  name: `${DEFAULT_TOAST_DURATION} seconds (Default)`,
                  props: { variant: 'warning', message },
                },
                { name: 'One second', props: { variant: 'error', message, duration: 1000 } },
              ],
            },
          ]}
        />
      )}
    </ToastStory>
  )
}

export const Playground: FC<ToastNS.Props> = props => {
  const handleCreateToast = (toast: UseToastNS.UseToastReturnType) => {
    toast.toast(props.message, props?.variant ?? 'neutral', { ...props })
  }
  return (
    <ToastStory creator={handleCreateToast} onMount={handleCreateToast}>
      {() => <StoryPlayground component={Toast} props={props} />}
    </ToastStory>
  )
}
