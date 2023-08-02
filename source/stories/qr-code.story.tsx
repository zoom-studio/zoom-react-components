import React, { type FC } from 'react'

import { type Meta } from '@storybook/react'

import { Button, QRCode, type QRCodeNS } from '../components'
import { CommonStory, StoryPlayground } from './components'
import { color } from '../utils'

const data = 'https://example.com'

const Children: FC<QRCodeNS.ChildrenCallbackParams> = ({ download, render }) => {
  return (
    <>
      {render()}
      <br />
      <Button onClick={download}>Download this qr code</Button>
    </>
  )
}

export default {
  title: 'Utility/QRCode',
  component: QRCode,
  args: {
    data,
    logo: '/logo.png',
    color: color({ source: 'warning' }),
    cornersDotType: 'dot',
    cornersSquareType: 'dot',
    dotsType: 'dots',
    downloadName: () => `zoom-qr-code-${new Date().toISOString()}`,
    children: Children,
    className: 'my-qr-code',
    containerProps: {},
    id: 'my-qr-code',
    onClick: undefined,
    size: 230,
    style: undefined,
  },
} as Meta<typeof QRCode>

export const CentralLogo: FC = () => {
  return (
    <CommonStory
      component={QRCode}
      stories={[
        {
          group: [
            {
              name: 'With central logo',
              props: { data, children: Children, logo: '/logo.png', key: 2 },
            },
          ],
        },
      ]}
    />
  )
}

export const Colorizing: FC = () => {
  return (
    <CommonStory
      component={QRCode}
      stories={[
        {
          group: [
            {
              name: 'Accent color (Default)',
              props: { data, children: Children },
            },
            {
              name: 'Custom color',
              props: { data, children: Children, color: 'gray' },
            },
          ],
        },
      ]}
    />
  )
}

export const Playground: FC<QRCodeNS.Props> = props => {
  return <StoryPlayground component={QRCode} props={props} />
}
