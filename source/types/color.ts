import { color } from '../utils/color'

export type Color = string | ((colorGenerator: typeof color) => string)
