import React, { FC, useMemo, useState } from 'react'

import { chunk, drop, groupBy } from 'lodash'

import { Emoji, EmojiNS, Icon, IconNS, Text, Tooltip, VirtualizedScrollView } from '..'
import { useZoomComponent } from '../../hooks'
import { BaseComponent } from '../../types'

export namespace EmojiPickerNS {
  export const CACHE_KEY = 'zoomrc-emoji-picker-history'

  export type Collection = EmojiNS.Emojis.GroupNames | 'History'

  export interface Props extends BaseComponent {
    onSelect?: (emoji: EmojiNS.Emojis.Names) => void
    cacheLength?: number
    defaultMemoizedEmojis?: EmojiNS.Emojis.Names[]
    defaultActiveCollection?: Collection
    emojisPerRow?: number
  }

  export interface HeaderItem {
    icon: IconNS.Names
    collection: Collection
  }

  export const defaultMemoizedEmojis: EmojiNS.Emojis.Names[] = [
    'face with tears of joy',
    'thinking face',
    'thumbs up',
    'check mark button',
    'face with peeking eye',
    'smiling face with heart-eyes',
  ]

  export type I18n = {
    pickAnEmoji?: string
    collections?: {
      [name in Collection]?: string
    }
    emojis?: {
      [name in EmojiNS.Emojis.Names]?: string
    }
  }
}

export const EmojiPicker: FC<EmojiPickerNS.Props> = ({
  defaultMemoizedEmojis = EmojiPickerNS.defaultMemoizedEmojis,
  cacheLength = 10,
  defaultActiveCollection = 'Smileys & Emotion',
  emojisPerRow = 10,
  containerProps,
  onSelect,
  className,
  reference,
  ...rest
}) => {
  const [collection, setCollection] = useState<EmojiPickerNS.Collection>(defaultActiveCollection)
  const [hoveredEmoji, setHoveredEmoji] = useState<EmojiNS.Emojis.Names | null>(null)

  const [cachedEmojis, setCachedEmojis] = useState<EmojiNS.Emojis.Names[]>(() => {
    const emojis: EmojiNS.Emojis.Names[] = JSON.parse(
      localStorage.getItem(EmojiPickerNS.CACHE_KEY) || '[]',
    )
    if (emojis.length > 0) {
      return emojis
    }
    localStorage.setItem(EmojiPickerNS.CACHE_KEY, JSON.stringify(defaultMemoizedEmojis))
    return defaultMemoizedEmojis
  })

  const { createClassName, globalI18ns: i18n } = useZoomComponent('emoji-picker')

  const getCollectionName = (collection: EmojiPickerNS.Collection): string => {
    return i18n?.emojiPicker?.collections?.[collection] ?? collection
  }
  const getEmojiName = (emojiName: EmojiNS.Emojis.Names): string => {
    return i18n?.emojiPicker?.emojis?.[emojiName] ?? emojiName
  }

  const containerClasses = createClassName(className)

  const headerItems: EmojiPickerNS.HeaderItem[] = [
    { collection: 'History', icon: 'history' },
    { collection: 'Smileys & Emotion', icon: 'sentiment_satisfied_alt' },
    { collection: 'People & Body', icon: 'thumb_up' },
    { collection: 'Animals & Nature', icon: 'pets' },
    { collection: 'Food & Drink', icon: 'restaurant' },
    { collection: 'Activities', icon: 'sports_football' },
    { collection: 'Travel & Places', icon: 'directions_car' },
    { collection: 'Objects', icon: 'lightbulb' },
    { collection: 'Symbols', icon: 'help_center' },
    { collection: 'Flags', icon: 'flag' },
  ]

  const allEmojis = useMemo(() => groupBy(EmojiNS.EmojiData.emojis, emoji => emoji.collection), [])

  const handleSelectEmoji = (emojiName: EmojiNS.Emojis.Names) => {
    onSelect?.(emojiName)

    setCachedEmojis(currentCache => {
      if (currentCache.includes(emojiName)) {
        return currentCache
      }

      let newCache = [...currentCache]

      if (newCache.length >= cacheLength) {
        newCache = drop(newCache)
      }

      newCache.push(emojiName)
      localStorage.setItem(EmojiPickerNS.CACHE_KEY, JSON.stringify(newCache))
      return newCache
    })
  }

  const renderEmojis = useMemo(() => {
    const emojis: EmojiNS.Emojis.Names[][] | EmojiNS.Emojis.Emoji[][] =
      collection === 'History'
        ? chunk(cachedEmojis, emojisPerRow)
        : chunk(allEmojis[collection], emojisPerRow)

    return (
      <div className="emojis" onMouseLeave={() => setHoveredEmoji(null)}>
        <VirtualizedScrollView.FixedGrid
          dataset={emojis}
          height="auto"
          width="auto"
          columnCount={emojisPerRow}
          rowCount={emojis.length}
          columnWidth={338 / emojisPerRow}
          rowHeight={338 / emojisPerRow}
          scrollViewProps={{ autoHide: true }}
          key={collection}
        >
          {({ data: emoji }) => {
            const emojiName = typeof emoji === 'object' ? emoji.name : emoji
            return (
              <span
                className="emoji-item"
                onMouseOver={() => setHoveredEmoji(emojiName)}
                onClick={() => handleSelectEmoji(emojiName)}
              >
                <Emoji name={emojiName} />
              </span>
            )
          }}
        </VirtualizedScrollView.FixedGrid>
      </div>
    )
  }, [collection, emojisPerRow])

  return (
    <div {...containerProps} {...rest} ref={reference} className={containerClasses}>
      <div className="header">
        {headerItems.map((item, index) => (
          <Tooltip key={index} title={getCollectionName(item.collection)}>
            <span
              className={`header-item${item.collection === collection ? ' active' : ''}`}
              onClick={() => setCollection(item.collection)}
            >
              <Icon name={item.icon} />
            </span>
          </Tooltip>
        ))}
      </div>

      <div className="collection-name-box">
        <Text className="collection-name">{getCollectionName(collection)}</Text>
      </div>

      {renderEmojis}

      <div className="footer">
        <Emoji name={hoveredEmoji ?? 'backhand index pointing up'} />
        <Text className="emoji-name">
          {hoveredEmoji
            ? getEmojiName(hoveredEmoji)
            : i18n?.emojiPicker?.pickAnEmoji ?? 'Pick an emoji...'}
        </Text>
      </div>
    </div>
  )
}
