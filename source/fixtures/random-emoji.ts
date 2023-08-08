import { randomNumber } from '@zoom-studio/js-ts-utils'

import { EMOJI_NAMES } from '../components/emoji/constants'

export const randomEmoji = () => {
  return EMOJI_NAMES[randomNumber({ min: 0, max: EMOJI_NAMES.length - 1 })]
}
