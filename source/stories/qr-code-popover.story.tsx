import React, { type FC } from 'react'

import { type Meta } from '@storybook/react'

import { QRCodePopover, type QRCodePopoverNS } from '../components'
import { CommonStory, StoryPlayground } from './components'
import { color } from '../utils'

const data = 'https://example.com'
const children = 'Show QR Code'

export default {
  title: 'Data display/QRCode popover',
  component: QRCodePopover,
  args: {
    data,
    children,
    title: 'The generated QRCode :)',
    actions: [{ children: 'share' }],
    showDownloadAction: true,
    logo: '/logo.png',
    popoverProps: undefined,
    color: color({ source: 'warning' }),
    cornersDotType: 'dot',
    cornersSquareType: 'dot',
    dotsType: 'dots',
    downloadName: () => `zoom-qr-code-${new Date().toISOString()}`,
    className: 'my-qr-code',
    containerProps: {},
    id: 'my-qr-code',
    onClick: undefined,
    size: 230,
    style: undefined,
    actionButtonsProps: {},
    buttonProps: {},
  },
} as Meta<typeof QRCodePopover>

export const DownloadAction = () => {
  return (
    <CommonStory
      component={QRCodePopover}
      stories={[
        {
          group: [
            { name: 'With download action (Default)', props: { data, children } },
            {
              name: 'Without download action',
              props: { data, showDownloadAction: false, children },
            },
          ],
        },
      ]}
    />
  )
}

export const MoreActions = () => {
  return (
    <CommonStory
      component={QRCodePopover}
      stories={[
        {
          group: [
            {
              props: {
                data,
                children,
                actions: [{ children: 'Share', prefixMaterialIcon: 'share' }],
              },
            },
          ],
        },
      ]}
    />
  )
}

export const CustomizedQRCode = () => {
  return (
    <CommonStory
      component={QRCodePopover}
      stories={[
        {
          group: [
            {
              props: {
                data,
                children,
                color: 'gray',
                dotsType: 'rounded',
                cornersDotType: 'square',
                cornersSquareType: 'extra-rounded',
                logo: '/logo.png',
              },
            },
          ],
        },
      ]}
    />
  )
}

export const CustomizedTriggerButton = () => {
  return (
    <CommonStory
      component={QRCodePopover}
      stories={[
        {
          group: [
            {
              props: {
                data,
                children,
                buttonProps: { variant: 'warning', type: 'bordered' },
              },
            },
          ],
        },
      ]}
    />
  )
}

export const CustomizedPopover = () => {
  return (
    <CommonStory
      component={QRCodePopover}
      stories={[
        {
          group: [
            {
              props: {
                data,
                children,
                popoverProps: { defaultIsOpen: true },
              },
            },
          ],
        },
      ]}
    />
  )
}

export const Playground: FC<QRCodePopoverNS.Props> = props => {
  return <StoryPlayground component={QRCodePopover} props={props} />
}
