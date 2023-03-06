import React, { FC } from 'react'

import { ComponentMeta } from '@storybook/react'

import { Explorer, ExplorerNS } from '../components'
import { StoryPlayground } from './components'
import { generateExplorerFiles } from '../fixtures'

export default {
  title: 'Data display/Explorer',
  component: Explorer,
  args: {
    files: generateExplorerFiles(100),
    alert: {
      title: 'یک فایل را انتخاب کنید',
      description: 'برای افزودن تصویر یک عکس را انتخاب کنید یا عکس جدیدی بارگذاری کنید',
    },
  },
} as ComponentMeta<typeof Explorer>

export const Playground: FC<ExplorerNS.Props> = props => {
  return <StoryPlayground component={Explorer} props={props} />
}
