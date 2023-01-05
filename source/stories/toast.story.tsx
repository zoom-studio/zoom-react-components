import React, { FC } from 'react'

import { ComponentMeta } from '@storybook/react'

import { Button, useToast } from '..'
import { Toast, ToastNS } from '../components/toast/toast'
import { StoryPlayground } from './components'
import { useI18n } from './hooks/use-i18n'

export default {
  title: 'Feedback/Toast',
  component: Toast,
} as ComponentMeta<typeof Toast>

export const Playground: FC<ToastNS.Props> = props => {
  const { t } = useI18n('dialog')
  useToast()

  return (
    <StoryPlayground<ToastNS.Props> component={Toast} props={props}>
      <Button>{t('open')}</Button>
    </StoryPlayground>
  )
}
