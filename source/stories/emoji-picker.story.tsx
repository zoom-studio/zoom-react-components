import React, { FC, useEffect, useState } from 'react'

import { ComponentMeta } from '@storybook/react'

import { EmojiPicker, EmojiPickerNS } from '../components'
import { CommonStory, StoryPlayground } from './components'

export default {
  title: 'Emoji/Emoji picker',
  component: EmojiPicker,
  args: {
    containerProps: {},
    onSelect: name => alert(name),
    cacheLength: 50,
    defaultActiveCollection: 'History',
    emojisPerRow: 10,
  },
} as ComponentMeta<typeof EmojiPicker>

export const EmojisPerRow: FC = () => {
  return (
    <CommonStory
      component={EmojiPicker}
      stories={[
        {
          group: [
            { name: '10 emojis (Default)' },
            { name: '5 emojis', props: { emojisPerRow: 5 } },
          ],
        },
      ]}
    />
  )
}

export const CacheLength: FC = () => {
  const [shouldRender, setShouldRender] = useState(false)

  useEffect(() => {
    localStorage.setItem(EmojiPickerNS.CACHE_KEY, '[]')
    setShouldRender(true)
  }, [])

  return shouldRender ? (
    <CommonStory
      component={EmojiPicker}
      stories={[
        { group: [{ name: '5 items in cache (Default is 10)', props: { cacheLength: 5 } }] },
      ]}
    />
  ) : (
    <></>
  )
}

export const DefaultMemoizedEmojis = () => {
  const [shouldRender, setShouldRender] = useState(false)

  useEffect(() => {
    localStorage.setItem(EmojiPickerNS.CACHE_KEY, '[]')
    setShouldRender(true)
  }, [])

  return shouldRender ? (
    <CommonStory
      component={EmojiPicker}
      stories={[
        {
          group: [
            {
              props: {
                defaultMemoizedEmojis: [
                  'heart decoration',
                  'heart exclamation',
                  'heart hands',
                  'heart on fire',
                ],
              },
            },
          ],
        },
      ]}
    />
  ) : (
    <></>
  )
}

export const ActiveCollection: FC = () => {
  return (
    <CommonStory
      component={EmojiPicker}
      stories={[
        {
          group: [
            { name: 'Smileys & Emotion (Default)' },
            { name: 'Objects', props: { defaultActiveCollection: 'Objects' } },
          ],
        },
      ]}
    />
  )
}

export const Playground: FC<EmojiPickerNS.Props> = props => {
  return <StoryPlayground component={EmojiPicker} props={props} />
}
