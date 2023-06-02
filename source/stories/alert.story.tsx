import React, { type FC } from 'react'

import { type Meta } from '@storybook/react'

import { Alert, type AlertNS, ReactionRate, useAlert, useMessage } from '../components'
import { lorem } from '../fixtures'
import { CommonStory, StoryPlayground, WithButtonsStory } from './components'
import { useI18n } from './hooks/use-i18n'

const children = <ReactionRate type="quintuple" size="large" />

export default {
  title: 'Feedback/Alert',
  component: Alert,
  args: {
    variant: 'neutral',
    loading: false,
    openByDefault: true,
    banner: false,
    closable: true,
    disableDocument: false,
    fluidContent: true,
    noIconAndEmoji: false,
    title: lorem(1),
    description: lorem(6),
    identifier: 'my-message-identifier',
    onWillClose: () => {},
    actions: ({ destroy }) => [
      { children: 'Destroy me', onClick: destroy },
      { children: 'Second action' },
    ],
    className: 'my-alert',
    containerProps: {},
    id: undefined,
    reference: undefined,
    onClick: undefined,
    style: {},
    children,
    icon: undefined,
    emoji: undefined,
  },
} as Meta<typeof Alert>

const useAlertStory = () => {
  const { t } = useI18n('alert')
  const actions: AlertNS.Props['actions'] = ({ destroy }) => [
    { children: 'Destroy me', onClick: destroy },
    { children: 'Second action' },
  ]
  return {
    actions,
    title: t('title'),
    description: t('description'),
  }
}

export const TitleAndDescription = () => {
  const { description, title } = useAlertStory()
  return (
    <CommonStory
      component={Alert}
      stories={[
        {
          group: [
            {
              name: 'With title',
              props: { title, identifier: 1 },
            },
            {
              name: 'With description',
              props: { description, identifier: 2 },
            },
            {
              name: 'With title and description',
              props: { title, description, identifier: 3 },
            },
          ],
        },
      ]}
    />
  )
}

export const CustomContent = () => {
  const { description, title } = useAlertStory()
  return (
    <CommonStory
      component={Alert}
      stories={[
        {
          group: [
            {
              name: 'Custom content only',
              props: { children, identifier: 1 },
            },
            {
              name: 'Custom content with description',
              props: { children, description, identifier: 2 },
            },
            {
              name: 'Custom content with title and description',
              props: { children, title, description, identifier: 3 },
            },
          ],
        },
      ]}
    />
  )
}

export const Actions = () => {
  const { actions, title } = useAlertStory()
  return (
    <CommonStory
      component={Alert}
      stories={[
        {
          group: [
            {
              name: 'Without any action (Default)',
              props: { title, identifier: 1 },
            },
            {
              name: 'With some actions',
              props: { title, actions, identifier: 2 },
            },
          ],
        },
      ]}
    />
  )
}

export const Closable = () => {
  const { actions, title } = useAlertStory()
  const message = useMessage()
  return (
    <CommonStory
      component={Alert}
      stories={[
        {
          group: [
            {
              name: 'Closable (Default)',
              props: { title, actions, identifier: 1 },
            },
            {
              name: 'None-closable',
              props: { title, actions, identifier: 2, closable: false },
            },
            {
              name: 'Closable with callback',
              props: {
                title,
                actions,
                identifier: 2,
                onWillClose: id =>
                  message.toast.neutral(`Alert with identifier "${id}" was destroyed`),
              },
            },
          ],
        },
      ]}
    />
  )
}

export const Variants = () => {
  const { description, title, actions } = useAlertStory()
  return (
    <CommonStory
      component={Alert}
      stories={[
        {
          group: [
            {
              name: 'Neutral (default)',
              props: { title, description, actions, children, identifier: 1, variant: 'neutral' },
            },
            {
              name: 'Success',
              props: { title, description, actions, children, identifier: 2, variant: 'success' },
            },
            {
              name: 'Info',
              props: { title, description, actions, children, identifier: 3, variant: 'info' },
            },
            {
              name: 'Warning',
              props: { title, description, actions, children, identifier: 4, variant: 'warning' },
            },
            {
              name: 'Error',
              props: { title, description, actions, children, identifier: 5, variant: 'error' },
            },
          ],
        },
      ]}
    />
  )
}

export const OmittedIcon = () => {
  const { description, title, actions } = useAlertStory()
  return (
    <CommonStory
      component={Alert}
      stories={[
        {
          group: [
            {
              name: 'Neutral (default)',
              props: {
                title,
                description,
                actions,
                children,
                identifier: 1,
                variant: 'neutral',
                noIconAndEmoji: true,
              },
            },
            {
              name: 'Success',
              props: {
                title,
                description,
                actions,
                children,
                identifier: 2,
                variant: 'success',
                noIconAndEmoji: true,
              },
            },
            {
              name: 'Info',
              props: {
                title,
                description,
                actions,
                children,
                identifier: 3,
                variant: 'info',
                noIconAndEmoji: true,
              },
            },
            {
              name: 'Warning',
              props: {
                title,
                description,
                actions,
                children,
                identifier: 4,
                variant: 'warning',
                noIconAndEmoji: true,
              },
            },
            {
              name: 'Error',
              props: {
                title,
                description,
                actions,
                children,
                identifier: 5,
                variant: 'error',
                noIconAndEmoji: true,
              },
            },
          ],
        },
      ]}
    />
  )
}

export const CustomIcon = () => {
  const { title, description } = useAlertStory()
  return (
    <CommonStory
      component={Alert}
      stories={[
        {
          group: [
            {
              name: 'Material icon',
              props: { title, description, identifier: 1, icon: 'light_mode' },
            },
            {
              name: 'Emoji',
              props: { title, description, identifier: 2, emoji: 'ring buoy' },
            },
          ],
        },
      ]}
    />
  )
}

export const LoadingState = () => {
  const { description, title } = useAlertStory()
  return (
    <CommonStory
      component={Alert}
      stories={[
        {
          group: [
            {
              name: 'Neutral (default)',
              props: { title, description, identifier: 1, variant: 'neutral', loading: true },
            },
            {
              name: 'Success',
              props: { title, description, identifier: 2, variant: 'success', loading: true },
            },
            {
              name: 'Info',
              props: { title, description, identifier: 3, variant: 'info', loading: true },
            },
            {
              name: 'Warning',
              props: { title, description, identifier: 4, variant: 'warning', loading: true },
            },
            {
              name: 'Error',
              props: { title, description, identifier: 5, variant: 'error', loading: true },
            },
          ],
        },
      ]}
    />
  )
}

export const FluidContent = () => {
  const { description, title } = useAlertStory()
  return (
    <CommonStory
      component={Alert}
      stories={[
        {
          group: [
            {
              name: 'Fluid (Default)',
              props: { title, description, children, identifier: 1 },
            },
            {
              name: 'Full width',
              props: { title, description, children, identifier: 1, fluidContent: false },
            },
          ],
        },
      ]}
    />
  )
}

export const DisableDocument = () => {
  const { title } = useAlertStory()
  return (
    <CommonStory
      component={Alert}
      stories={[
        {
          group: [
            {
              name: 'Disable entire document when the alert is open',
              props: { title, identifier: 1, disableDocument: true },
            },
          ],
        },
      ]}
    />
  )
}

export const BannerStyle = () => {
  const { title } = useAlertStory()
  return (
    <CommonStory
      component={Alert}
      stories={[
        {
          group: [
            {
              name: 'None-banner style (Default)',
              props: { title, identifier: 1, variant: 'info' },
            },
            {
              name: 'Banner style',
              props: { title, identifier: 2, banner: true, variant: 'info' },
            },
          ],
        },
      ]}
    />
  )
}

export const Playground: FC<AlertNS.Props> = props => {
  const message = useMessage()
  const alert = useAlert()

  return (
    <WithButtonsStory
      buttons={[
        {
          children: 'Reshow alert',
          onClick: () => {
            alert.show(props.identifier)
          },
          type: 'dashed',
          disabled: alert.isOpen(props.identifier),
        },
      ]}
    >
      <StoryPlayground
        component={Alert}
        props={{
          ...props,
          onWillClose: id => message.toast.neutral(`Alert with identifier "${id}" was destroyed`),
        }}
      />
    </WithButtonsStory>
  )
}
