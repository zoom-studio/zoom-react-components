import React, { FC } from 'react'

import { ComponentMeta } from '@storybook/react'

import { Button, Divider, DividerNS, ReactionRate } from '../components'
import { CommonStory, StoryPlayground } from './components'
import { useI18n } from './hooks/use-i18n'
import { color } from '../utils'

export default {
  title: 'Layout/Divider',
  component: Divider,
  args: {
    children: 'Some text',
    childrenPlacement: 'start',
    verticalHeight: '1.5rem',
    truncate: true,
    vertical: false,
    dashed: false,
    selectableTitle: false,
  },
} as ComponentMeta<typeof Divider>

const useDividerStory = () => {
  const { t } = useI18n('divider')
  const textualChildren = t('textualChildren')
  const longerTextualChildren = `${textualChildren} ${textualChildren} ${textualChildren}`
  const DividedItem = () => {
    const { t } = useI18n('button')
    return <Button>{t('sampleTitle')}</Button>
  }
  const CustomChild = () => {
    return <ReactionRate />
  }
  return { DividedItem, textualChildren, longerTextualChildren, CustomChild }
}

export const Directions = () => {
  const { DividedItem, textualChildren } = useDividerStory()
  return (
    <CommonStory
      component={Divider}
      stories={[
        {
          title: 'Horizontal (Default)',
          custom: (
            <>
              <Divider>{textualChildren}</Divider>
              <DividedItem />
              <Divider>{textualChildren}</Divider>
              <DividedItem />
              <Divider>{textualChildren}</Divider>
              <DividedItem />
            </>
          ),
        },
        {
          title: 'Vertical',
          custom: (
            <>
              <DividedItem />
              <Divider vertical />
              <DividedItem />
              <Divider vertical />
              <DividedItem />
            </>
          ),
        },
      ]}
    />
  )
}

export const LineStyle = () => {
  const { DividedItem, textualChildren } = useDividerStory()
  return (
    <CommonStory
      component={Divider}
      stories={[
        {
          title: 'Solid (Default)',
          custom: (
            <>
              <Divider>{textualChildren}</Divider>
              <DividedItem />
              <Divider>{textualChildren}</Divider>
              <DividedItem />
              <br />
              <br />
              <br />
              <DividedItem />
              <Divider vertical />
              <DividedItem />
              <Divider vertical />
              <DividedItem />
            </>
          ),
        },
        {
          title: 'Dashed',
          custom: (
            <>
              <Divider dashed>{textualChildren}</Divider>
              <DividedItem />
              <Divider dashed>{textualChildren}</Divider>
              <DividedItem />
              <br />
              <br />
              <br />
              <DividedItem />
              <Divider dashed vertical />
              <DividedItem />
              <Divider dashed vertical />
              <DividedItem />
            </>
          ),
        },
      ]}
    />
  )
}

export const ChildrenPlacement = () => {
  const { DividedItem, textualChildren } = useDividerStory()
  return (
    <CommonStory
      component={Divider}
      stories={[
        {
          title: 'Start (Default)',
          custom: (
            <>
              <Divider>{textualChildren}</Divider>
              <DividedItem />
              <Divider>{textualChildren}</Divider>
              <DividedItem />
            </>
          ),
        },
        {
          title: 'Center',
          custom: (
            <>
              <Divider childrenPlacement="center">{textualChildren}</Divider>
              <DividedItem />
              <Divider childrenPlacement="center">{textualChildren}</Divider>
              <DividedItem />
            </>
          ),
        },
        {
          title: 'End',
          custom: (
            <>
              <Divider childrenPlacement="end">{textualChildren}</Divider>
              <DividedItem />
              <Divider childrenPlacement="end">{textualChildren}</Divider>
              <DividedItem />
            </>
          ),
        },
      ]}
    />
  )
}

export const HorizontalTruncatedTitle = () => {
  const { DividedItem, longerTextualChildren } = useDividerStory()
  return (
    <CommonStory
      component={Divider}
      stories={[
        {
          title: 'Truncated (Default)',
          custom: (
            <>
              <Divider>{longerTextualChildren}</Divider>
              <DividedItem />
              <Divider>{longerTextualChildren}</Divider>
              <DividedItem />
            </>
          ),
        },
        {
          title: 'None truncated',
          custom: (
            <>
              <Divider truncate={false}>{longerTextualChildren}</Divider>
              <DividedItem />
              <Divider truncate={false}>{longerTextualChildren}</Divider>
              <DividedItem />
            </>
          ),
        },
      ]}
    />
  )
}

export const HorizontalSelectableTitle = () => {
  const { DividedItem, textualChildren } = useDividerStory()
  return (
    <CommonStory
      component={Divider}
      stories={[
        {
          title: 'None selectable (Default)',
          custom: (
            <>
              <Divider>{textualChildren}</Divider>
              <DividedItem />
              <Divider>{textualChildren}</Divider>
              <DividedItem />
            </>
          ),
        },
        {
          title: 'Selectable',
          custom: (
            <>
              <Divider selectableTitle>{textualChildren}</Divider>
              <DividedItem />
              <Divider selectableTitle>{textualChildren}</Divider>
              <DividedItem />
            </>
          ),
        },
      ]}
    />
  )
}

export const HorizontalCustomChild = () => {
  const { DividedItem, CustomChild } = useDividerStory()
  return (
    <CommonStory
      component={Divider}
      stories={[
        {
          custom: (
            <>
              <Divider childrenPlacement="end">
                <CustomChild />
              </Divider>

              <DividedItem />

              <Divider childrenPlacement="center">
                <CustomChild />
              </Divider>

              <DividedItem />

              <Divider childrenPlacement="start">
                <CustomChild />
              </Divider>

              <DividedItem />
            </>
          ),
        },
      ]}
    />
  )
}

export const HorizontalCustomTextualChild = () => {
  const { DividedItem, textualChildren } = useDividerStory()
  return (
    <CommonStory
      component={Divider}
      stories={[
        {
          custom: (
            <>
              <Divider titleProps={{ h1: true }}>{textualChildren}</Divider>
              <DividedItem />
              <Divider titleProps={{ style: { color: color({ source: 'error' }) } }}>
                {textualChildren}
              </Divider>
            </>
          ),
        },
      ]}
    />
  )
}

export const VerticalCustomHeight = () => {
  const { DividedItem } = useDividerStory()
  return (
    <CommonStory
      component={Divider}
      stories={[
        {
          title: '1.5rem (Default)',
          custom: (
            <>
              <DividedItem />
              <Divider vertical />
              <DividedItem />
            </>
          ),
        },
        {
          title: '3rem',
          custom: (
            <>
              <DividedItem />
              <Divider verticalHeight="3rem" vertical />
              <DividedItem />
            </>
          ),
        },
      ]}
    />
  )
}

export const Playground: FC<DividerNS.Props> = props => {
  return <StoryPlayground component={Divider} props={props} />
}
