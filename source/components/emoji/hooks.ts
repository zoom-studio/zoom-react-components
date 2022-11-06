import { EMOJI_DATA } from './constants'
import { EmojiNS } from '..'

export const useFlattedEmojis = (): object => {
  const flattedEmojis = {}

  const groups = Object.keys(EMOJI_DATA)

  groups.forEach(group => {
    const subgroups = Object.keys((EMOJI_DATA as any)[group])
    subgroups.forEach(subgroup => {
      const emojis = Object.keys((EMOJI_DATA as any)[group][subgroup])
      const emojisData = Object.values((EMOJI_DATA as any)[group][subgroup])
      emojis.forEach((emoji, emojiId) => {
        Object.assign(flattedEmojis, { [emoji]: emojisData[emojiId] })
      })
    })
  })

  return flattedEmojis
}

export const useFindEmoji = (name: EmojiNS.Emojis.Names): string => {
  const emojis = useFlattedEmojis()
  return Object.values(emojis)[Object.keys(emojis).indexOf(name)]
}
