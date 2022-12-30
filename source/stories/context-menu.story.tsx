import React, { FC } from 'react'

import { ComponentMeta } from '@storybook/react'

import { ContextMenu, Emoji, Text } from '..'
import { enMenuItems, faMenuItems } from '../fixtures'
import { useAddDataAttrs } from './hooks'

import './styles/_context-menu.scss'

export default {
  title: 'ContextMenu',
  component: ContextMenu,
} as ComponentMeta<typeof ContextMenu>

namespace ContextMenuStoryNS {
  export interface Props {
    layout: 'ltr' | 'rtl'
  }
}

const ContextMenuStory: FC<ContextMenuStoryNS.Props> = ({ layout }) => {
  const isRTL = layout === 'rtl'
  useAddDataAttrs(layout)

  return (
    <div className="context-menu-story">
      <ContextMenu menuProps={{ isRTL }} items={isRTL ? faMenuItems : enMenuItems}>
        <Text light normal>
          Or long press for touchable devices
        </Text>

        <Text bold large>
          Right click on me
        </Text>

        <Emoji name="smiling face with smiling eyes" />
      </ContextMenu>
    </div>
  )
}

export const RTLLayout: FC = () => <ContextMenuStory layout="rtl" />
export const LTRLayout: FC = () => <ContextMenuStory layout="ltr" />
