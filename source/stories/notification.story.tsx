import React, { FC, ReactNode, useEffect } from 'react'

import { ComponentMeta } from '@storybook/react'

import { CommonStory, StoryPlayground, WithButtonsStory } from './components'

import { COMMON_VARIANTS } from '../constants'
import { useI18n } from './hooks/use-i18n'

import { ButtonNS, useMessage } from '..'

import { DEFAULT_NOTIFICATION_DURATION } from '../components/message/constants'
import { Notification, NotificationNS } from '../components/message/notification'
import { UseNotificationNS } from '../components/message/notification/use-notification'

interface NotificationStoryProps {
  children?: (notification: UseNotificationNS.UseNotificationReturnType) => ReactNode
  creator?: (notification: UseNotificationNS.UseNotificationReturnType) => void
  moreButtons?: (notification: UseNotificationNS.UseNotificationReturnType) => ButtonNS.Props[]
  onMount?: (notification: UseNotificationNS.UseNotificationReturnType) => void
  defaultButtons?: {
    pushNew?: boolean
    destroyAll?: boolean
    terminateAll?: boolean
  }
}
const NotificationStory: FC<NotificationStoryProps> = ({
  defaultButtons = { destroyAll: true, pushNew: true, terminateAll: true },
  ...props
}) => {
  const { notify } = useMessage()
  const buttons: ButtonNS.Props[] = props.moreButtons?.(notify) ?? []
  if (defaultButtons?.pushNew) {
    buttons.push({ children: 'Push', onClick: () => props.creator?.(notify) })
  }
  if (defaultButtons?.destroyAll) {
    buttons.push({ children: 'Destroy all', onClick: notify.destroyAll })
  }
  if (defaultButtons?.terminateAll) {
    buttons.push({ children: 'Terminate all', onClick: notify.terminateAll })
  }
  useEffect(() => {
    notify.terminateAll()
    props.onMount?.(notify)
  }, [])
  return <WithButtonsStory buttons={buttons}>{props.children?.(notify)}</WithButtonsStory>
}

const IMAGE = 'https://image-placeholder.com/images/actual-size/320x200.png'
const SOUND = 'https://soundbible.com/mp3/Music_Box-Big_Daddy-1389738694.mp3'

export default {
  title: 'Feedback/Notification',
  component: Notification,
  args: {
    message: 'Some message',
    title: 'Some title',
    images: [IMAGE, IMAGE, IMAGE],
    duration: 20000,
    closable: true,
    loading: false,
    noIconAndEmoji: false,
    emoji: undefined,
    icon: undefined,
    playSound: true,
    variant: 'neutral',
  },
} as ComponentMeta<typeof Notification>

export const Variants: FC = () => {
  const { t } = useI18n('notification')
  const title = t('title')
  const message = t('message')
  const createNotifies = (notify: UseNotificationNS.UseNotificationReturnType) => {
    COMMON_VARIANTS.forEach(variant => {
      notify.notify(title, message, variant)
    })
  }
  return (
    <NotificationStory creator={createNotifies} onMount={createNotifies}>
      {() => (
        <CommonStory
          component={Notification}
          stories={[
            {
              group: [
                { name: 'Neutral (default)', props: { title, message, variant: 'neutral' } },
                { name: 'Success', props: { title, message, variant: 'success' } },
                { name: 'Info', props: { title, message, variant: 'info' } },
                { name: 'Warning', props: { title, message, variant: 'warning' } },
                { name: 'Error', props: { title, message, variant: 'error' } },
              ],
            },
          ]}
        />
      )}
    </NotificationStory>
  )
}

export const WithSomeImages: FC = () => {
  const { t } = useI18n('notification')
  const title = t('title')
  const message = t('message')
  const createNotifies = (notify: UseNotificationNS.UseNotificationReturnType) => {
    notify.neutral(title, message, { images: [IMAGE, IMAGE] })
  }
  return (
    <NotificationStory creator={createNotifies} onMount={createNotifies}>
      {() => (
        <CommonStory
          component={Notification}
          stories={[
            {
              group: [{ props: { title, message, images: [IMAGE, IMAGE] } }],
            },
          ]}
        />
      )}
    </NotificationStory>
  )
}

export const WithSomeActions: FC = () => {
  const { t } = useI18n('notification')
  const { t: tb } = useI18n('button')

  const title = t('title')
  const message = t('message')

  const actions = (
    notify: UseNotificationNS.UseNotificationReturnType,
  ): NotificationNS.Action[] => [
    { children: tb('sampleTitle'), variant: 'success' },
    notificationId => ({
      children: t('dismiss'),
      variant: 'error',
      onClick: () => notify.destroy(notificationId),
    }),
  ]

  const createNotifies = (notify: UseNotificationNS.UseNotificationReturnType) => {
    notify.neutral(title, message, { images: [IMAGE], actions: actions(notify) })
  }

  return (
    <NotificationStory creator={createNotifies} onMount={createNotifies}>
      {notify => (
        <CommonStory
          component={Notification}
          stories={[
            {
              group: [{ props: { title, message, images: [IMAGE], actions: actions(notify) } }],
            },
          ]}
        />
      )}
    </NotificationStory>
  )
}

export const NoneClosable: FC = () => {
  const { t } = useI18n('notification')
  const title = t('title')
  const message = t('message')
  const createNotifies = (notify: UseNotificationNS.UseNotificationReturnType) => {
    COMMON_VARIANTS.forEach(variant => {
      notify.notify(title, message, variant, { closable: false })
    })
  }
  return (
    <NotificationStory creator={createNotifies} onMount={createNotifies}>
      {() => (
        <CommonStory
          component={Notification}
          stories={[
            {
              group: [
                {
                  name: 'Neutral (default)',
                  props: { title, message, closable: false, variant: 'neutral' },
                },
                { name: 'Success', props: { title, message, closable: false, variant: 'success' } },
                { name: 'Info', props: { title, message, closable: false, variant: 'info' } },
                { name: 'Warning', props: { title, message, closable: false, variant: 'warning' } },
                { name: 'Error', props: { title, message, closable: false, variant: 'error' } },
              ],
            },
          ]}
        />
      )}
    </NotificationStory>
  )
}

export const WithoutSound: FC = () => {
  const { t } = useI18n('notification')
  const title = t('title')
  const message = t('message')
  const createNotifies = (notify: UseNotificationNS.UseNotificationReturnType) => {
    notify.notify(title, message, 'neutral', { playSound: false })
  }
  return (
    <NotificationStory creator={createNotifies} onMount={createNotifies}>
      {() => (
        <CommonStory
          component={Notification}
          stories={[{ group: [{ props: { title, message, playSound: false } }] }]}
        />
      )}
    </NotificationStory>
  )
}

export const CustomSound: FC = () => {
  const { t } = useI18n('notification')
  const title = t('title')
  const message = t('message')
  const createNotifies = (notify: UseNotificationNS.UseNotificationReturnType) => {
    notify.notify(title, message, 'neutral', { customSound: SOUND })
  }
  return (
    <NotificationStory creator={createNotifies} onMount={createNotifies}>
      {() => (
        <CommonStory
          component={Notification}
          stories={[{ group: [{ props: { title, message, customSound: SOUND } }] }]}
        />
      )}
    </NotificationStory>
  )
}

export const WithoutProgress: FC = () => {
  const { t } = useI18n('notification')
  const title = t('title')
  const message = t('message')
  const createNotifies = (notify: UseNotificationNS.UseNotificationReturnType) => {
    notify.notify(title, message, 'neutral', { showProgress: false })
  }
  return (
    <NotificationStory creator={createNotifies} onMount={createNotifies}>
      {() => (
        <CommonStory
          component={Notification}
          stories={[{ group: [{ props: { title, message, showProgress: false } }] }]}
        />
      )}
    </NotificationStory>
  )
}

export const OmittedIcon: FC = () => {
  const { t } = useI18n('notification')
  const title = t('title')
  const message = t('message')
  const createNotifies = (notify: UseNotificationNS.UseNotificationReturnType) => {
    COMMON_VARIANTS.forEach(variant => {
      notify.notify(title, message, variant, { closable: true, noIconAndEmoji: true })
    })
  }
  return (
    <NotificationStory creator={createNotifies} onMount={createNotifies}>
      {() => (
        <CommonStory
          component={Notification}
          stories={[
            {
              group: [
                {
                  name: 'Neutral (default)',
                  props: {
                    title,
                    message,
                    closable: true,
                    noIconAndEmoji: true,
                    variant: 'neutral',
                  },
                },
                {
                  name: 'Success',
                  props: {
                    title,
                    message,
                    closable: true,
                    noIconAndEmoji: true,
                    variant: 'success',
                  },
                },
                {
                  name: 'Info',
                  props: { title, message, closable: true, noIconAndEmoji: true, variant: 'info' },
                },
                {
                  name: 'Warning',
                  props: {
                    title,
                    message,
                    closable: true,
                    noIconAndEmoji: true,
                    variant: 'warning',
                  },
                },
                {
                  name: 'Error',
                  props: { title, message, closable: true, noIconAndEmoji: true, variant: 'error' },
                },
              ],
            },
          ]}
        />
      )}
    </NotificationStory>
  )
}

export const CustomIcon: FC = () => {
  const { t } = useI18n('notification')
  const title = t('title')
  const message = t('message')
  const createNotifies = (notify: UseNotificationNS.UseNotificationReturnType) => {
    notify.notify(title, message, 'neutral', { icon: 'hdr_auto_select' })
    notify.notify(title, message, 'neutral', { emoji: 'heart hands' })
  }
  return (
    <NotificationStory creator={createNotifies} onMount={createNotifies}>
      {() => (
        <CommonStory
          component={Notification}
          stories={[
            {
              group: [
                { name: 'Material icon', props: { title, message, icon: 'hdr_auto_select' } },
                { name: 'Emoji', props: { title, message, emoji: 'heart hands' } },
              ],
            },
          ]}
        />
      )}
    </NotificationStory>
  )
}

export const LoadingState: FC = () => {
  const { t } = useI18n('notification')
  const title = t('title')
  const message = t('message')
  const createNotifies = (notify: UseNotificationNS.UseNotificationReturnType) => {
    COMMON_VARIANTS.forEach(variant => {
      notify.notify(title, message, variant, { loading: true })
    })
  }
  return (
    <NotificationStory creator={createNotifies} onMount={createNotifies}>
      {() => (
        <CommonStory
          component={Notification}
          stories={[
            {
              group: [
                {
                  name: 'Neutral (default)',
                  props: { title, message, variant: 'neutral', loading: true },
                },
                { name: 'Success', props: { title, message, variant: 'success', loading: true } },
                { name: 'Info', props: { title, message, variant: 'info', loading: true } },
                { name: 'Warning', props: { title, message, variant: 'warning', loading: true } },
                { name: 'Error', props: { title, message, variant: 'error', loading: true } },
              ],
            },
          ]}
        />
      )}
    </NotificationStory>
  )
}

export const UpdateExistNotify: FC = () => {
  const { t } = useI18n('notification')
  const message = t('message')
  const title = t('title')
  const reset = (notify: UseNotificationNS.UseNotificationReturnType) => {
    notify.notify(title, message, 'warning', {
      loading: true,
      id: 'my-notification',
      closable: true,
    })
  }
  const update = (notify: UseNotificationNS.UseNotificationReturnType) => {
    notify.notify(title, message, 'success', {
      loading: false,
      id: 'my-notification',
      closable: true,
    })
  }
  return (
    <NotificationStory
      onMount={reset}
      defaultButtons={{}}
      moreButtons={notify => [
        { onClick: () => reset(notify), children: 'Push new or reset to default' },
        {
          onClick: () => update(notify),
          children: 'Push new or update the exist',
        },
      ]}
    >
      {() => (
        <CommonStory
          component={Notification}
          stories={[
            {
              group: [
                {
                  name: 'Warning and loading',
                  props: { title, message, loading: true, closable: true, variant: 'warning' },
                },
                {
                  name: 'Success',
                  props: { title, message, loading: false, variant: 'success', closable: true },
                },
              ],
            },
          ]}
        />
      )}
    </NotificationStory>
  )
}

export const Duration: FC = () => {
  const { t } = useI18n('notification')
  const message = t('message')
  const title = t('message')
  const createNotifies = (notify: UseNotificationNS.UseNotificationReturnType) => {
    notify.warning(title, message)
    notify.error(title, message, { duration: 1000 })
  }
  return (
    <NotificationStory creator={createNotifies} onMount={createNotifies}>
      {() => (
        <CommonStory
          component={Notification}
          stories={[
            {
              group: [
                {
                  name: `${DEFAULT_NOTIFICATION_DURATION} seconds (Default)`,
                  props: { title, variant: 'warning', message },
                },
                { name: 'One second', props: { title, variant: 'error', message, duration: 1000 } },
              ],
            },
          ]}
        />
      )}
    </NotificationStory>
  )
}

export const Playground: FC<NotificationNS.Props> = props => {
  const handleCreateNotification = (notification: UseNotificationNS.UseNotificationReturnType) => {
    notification.notify(props.title, props.message, props?.variant ?? 'neutral', { ...props })
  }
  return (
    <NotificationStory creator={handleCreateNotification}>
      {() => <StoryPlayground component={Notification} props={props} />}
    </NotificationStory>
  )
}
