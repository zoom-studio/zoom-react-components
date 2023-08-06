import { randomNumber } from '@zoom-studio/zoom-js-ts-utils'

import { ICON_NAMES } from '../components/icon/constants/icon-names'

export const randomIcon = () => {
  return ICON_NAMES[randomNumber({ min: 0, max: ICON_NAMES.length - 1 })]
}
