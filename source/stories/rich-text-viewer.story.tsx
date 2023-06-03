import React, { type FC } from 'react'

import { type Meta } from '@storybook/react'

import { RichTextViewer, type RichTextViewerNS } from '../components'
import { StoryPlayground } from './components'
import { FULL_FEATURE_RICH_TEXT } from '../fixtures'

export default {
  title: 'Data display/Rich text viewer',
  component: RichTextViewer,
  args: {
    value: JSON.parse(FULL_FEATURE_RICH_TEXT),
  },
} as Meta<typeof RichTextViewer>

export const Playground: FC<RichTextViewerNS.Props> = props => {
  return <StoryPlayground component={RichTextViewer} props={props} />
}
