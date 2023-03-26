import React, { FC } from 'react'

import { ComponentMeta } from '@storybook/react'

import { PopConfirm, PopConfirmNS, useMessage } from '..'
import { COMMON_VARIANTS } from '../constants'
import { CommonStory, CommonStoryNS, PlacementsStory, StoryPlayground } from './components'
import { useI18n } from './hooks/use-i18n'

export default {
  title: 'Feedback/PopConfirm',
  component: PopConfirm,
  args: {
    title: 'Some title',
    children: 'Trigger me to show popConfirm',
    variant: 'warning',
    description: 'Some sample description to be shown as the pop confirm description',
    placement: 'top',
    defaultIsOpen: true,
    noIconAndEmoji: false,
    emoji: undefined,
    icon: undefined,
  },
} as ComponentMeta<typeof PopConfirm>

const usePopConfirmStory = () => {
  const message = useMessage()

  const { t } = useI18n('popConfirm')
  const title = t('title')
  const description = t('description')
  const ok = t('ok')
  const no = t('no')
  const button = t('button')

  const onOk = () => message.toast.success(t('onOk'), { playSound: true })
  const onNo = () => message.toast.error(t('onNo'), { playSound: true })

  const commonProps: PopConfirmNS.Props = {
    title,
    description,
    confirm: { onClick: onOk, children: ok },
    cancel: { onClick: onNo, children: no },
    children: button,
  }

  return { title, description, ok, no, button, onOk, onNo, commonProps }
}

export const Variants: FC = () => {
  const { commonProps } = usePopConfirmStory()
  const group: CommonStoryNS.Group<PopConfirmNS.Props>[] = COMMON_VARIANTS.map(variant => ({
    name: variant,
    props: { ...commonProps, variant },
  }))

  return <CommonStory component={PopConfirm} stories={[{ group }]} />
}

export const Placements: FC = () => {
  const { commonProps } = usePopConfirmStory()
  return (
    <PlacementsStory
      component={PopConfirm}
      props={{
        ...commonProps,
        variant: 'warning',
        buttonProps: { size: 'small' },
      }}
    />
  )
}

export const Description: FC = () => {
  const { commonProps } = usePopConfirmStory()
  return (
    <CommonStory
      component={PopConfirm}
      stories={[
        {
          title: 'Without description',
          custom: <PopConfirm {...commonProps} description={undefined} />,
        },
        { title: 'With description', custom: <PopConfirm {...commonProps} /> },
      ]}
    />
  )
}

export const CustomActions: FC = () => {
  const { commonProps, ok, onOk, no, onNo } = usePopConfirmStory()
  return (
    <CommonStory
      component={PopConfirm}
      stories={[
        {
          title: 'With description',
          custom: (
            <PopConfirm
              {...commonProps}
              cancel={{ variant: 'error', type: 'link', children: no, onClick: onNo }}
              confirm={{ variant: 'info', type: 'dashed', children: ok, onClick: onOk }}
            />
          ),
        },
      ]}
    />
  )
}

export const OmittedIcon: FC = () => {
  const { commonProps } = usePopConfirmStory()
  const group: CommonStoryNS.Group<PopConfirmNS.Props>[] = COMMON_VARIANTS.map(variant => ({
    name: variant,
    props: { ...commonProps, variant, noIconAndEmoji: true },
  }))
  return <CommonStory component={PopConfirm} stories={[{ group }]} />
}

export const CustomIcon: FC = () => {
  const { commonProps } = usePopConfirmStory()
  const group: CommonStoryNS.Group<PopConfirmNS.Props>[] = COMMON_VARIANTS.map(variant => ({
    name: variant,
    props: { ...commonProps, variant, icon: 'verified' },
  }))
  return <CommonStory component={PopConfirm} stories={[{ group }]} />
}

export const EmojiInsteadOfIcon: FC = () => {
  const { commonProps } = usePopConfirmStory()
  const group: CommonStoryNS.Group<PopConfirmNS.Props>[] = COMMON_VARIANTS.map(variant => ({
    name: variant,
    props: { ...commonProps, variant, emoji: 'mosque' },
  }))
  return <CommonStory component={PopConfirm} stories={[{ group }]} />
}

export const AutoClose: FC = () => {
  const { commonProps } = usePopConfirmStory()
  return (
    <CommonStory
      component={PopConfirm}
      stories={[{ custom: <PopConfirm {...commonProps} autoCloseDelay={1000} /> }]}
    />
  )
}

export const Playground: FC<PopConfirmNS.Props> = props => {
  const message = useMessage()
  if (!props.confirm) {
    props.confirm = {
      onClick: () => message.toast.success('Confirmed'),
      children: 'Confirm',
    }
  }
  if (!props.cancel) {
    props.cancel = {
      onClick: () => message.toast.error('Canceled'),
      children: 'Cancel',
    }
  }
  return (
    <StoryPlayground
      containerProps={{
        style: { minHeight: 500, display: 'flex', alignItems: 'center', justifyContent: 'center' },
      }}
      component={PopConfirm}
      props={props}
    />
  )
}
