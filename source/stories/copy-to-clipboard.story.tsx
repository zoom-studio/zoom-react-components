import React, { type FC } from 'react'

import { type Meta } from '@storybook/react'

import { Button, CopyToClipboard, type CopyToClipboardNS, useMessage } from '..'
import { lorem } from '../fixtures'
import { CommonStory, StoryPlayground } from './components'
import { useI18n } from './hooks/use-i18n'

export default {
  title: 'Call To Action/Copy to clipboard',
  component: CopyToClipboard,
  args: {
    text: lorem(2),
    children: ({ copy }) => <Button onClick={copy}>Click me</Button>,
    errorMessage: 'Some error message',
    onCopyClicked: () => {},
    successMessage: 'Some success message',
    resetTimeout: 2000,
    toastOnSuccess: true,
    toastOnError: true,
  },
} as Meta<typeof CopyToClipboard>

const useCopyToClipboardStory = () => {
  const { t } = useI18n('copyToClipboard')
  const message = useMessage()

  const btn = t('buttonTitle')
  const text = t('text')
  const error = t('error')
  const success = t('success')
  const callback = () => message.toast.info(t('callback'))

  const commonChildren: CopyToClipboardNS.Props['children'] = ({
    copy,
    isLoading,
    variant,
    state,
  }) => (
    <Button variant={variant} onClick={copy} loading={isLoading}>
      {state === 'copied' ? success : state === 'errored' ? error : btn}
    </Button>
  )

  return { btn, text, error, success, commonChildren, callback }
}

export const WithToast = () => {
  const { text, commonChildren } = useCopyToClipboardStory()

  return (
    <CommonStory
      component={CopyToClipboard}
      stories={[
        {
          group: [
            {
              name: 'With toast on error',
              props: {
                text,
                children: commonChildren,
                toastOnError: true,
                toastOnSuccess: false,
              },
            },
            {
              name: 'With toast on success',
              props: {
                text,
                children: commonChildren,
                toastOnError: false,
                toastOnSuccess: true,
              },
            },
            {
              name: 'With toast on success and error',
              props: {
                text,
                children: commonChildren,
                toastOnError: true,
                toastOnSuccess: true,
              },
            },
            {
              name: 'Without any toast',
              props: {
                text,
                children: commonChildren,
                toastOnError: false,
                toastOnSuccess: false,
              },
            },
          ],
        },
      ]}
    />
  )
}

export const OnCopyCallback = () => {
  const { text, commonChildren, callback } = useCopyToClipboardStory()

  return (
    <CommonStory
      component={CopyToClipboard}
      stories={[
        {
          group: [
            {
              name: 'Without callback on copy (Default)',
              props: { text, children: commonChildren },
            },
            {
              name: 'With callback on copy',
              props: { text, children: commonChildren, onCopyClicked: callback },
            },
          ],
        },
      ]}
    />
  )
}

export const ResetTimeout = () => {
  const { text, commonChildren } = useCopyToClipboardStory()

  return (
    <CommonStory
      component={CopyToClipboard}
      stories={[
        {
          group: [
            {
              name: 'Will reset after 2 seconds (Default)',
              props: { text, children: commonChildren },
            },
            {
              name: 'Will reset after 5 seconds (Custom)',
              props: { text, children: commonChildren, resetTimeout: 5000 },
            },
            {
              name: 'Will reset immediately (Custom)',
              props: { text, children: commonChildren, resetTimeout: 0 },
            },
          ],
        },
      ]}
    />
  )
}

export const Playground: FC<CopyToClipboardNS.Props> = props => (
  <StoryPlayground component={CopyToClipboard} props={props} />
)
