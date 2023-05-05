import { Range } from '@zoom-studio/zoom-js-ts-utils'
import { Color } from '../types/color'
export declare namespace ColorNS {
  const MODES: readonly ['lighter', 'darker', 'glassy']
  const THEME_SOURCES: readonly ['layer', 'text', 'border', 'accent']
  const BASE_SOURCES: readonly [
    'success',
    'info',
    'warning',
    'error',
    'backdrop',
    'placeholder',
    'skeleton',
  ]
  const SOURCES: readonly [
    'layer',
    'text',
    'border',
    'accent',
    'success',
    'info',
    'warning',
    'error',
    'backdrop',
    'placeholder',
    'skeleton',
  ]
  type Tone = Range<1, 4>
  type Weight = Range<1, 10>
  type Mode = typeof MODES[number]
  type Sources = typeof SOURCES[number]
  type BaseSources = typeof BASE_SOURCES[number]
  type ThemeSources = typeof THEME_SOURCES[number]
  interface Parameters {
    source?: Sources
    tone?: Tone
    mode?: Mode
    weight?: Weight
  }
}
export declare const color: (parameters?: ColorNS.Parameters) => string
export declare const colorFnToColor: (givenColor: Color) => string
