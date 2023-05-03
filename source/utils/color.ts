import { Range } from '@zoom-studio/zoom-js-ts-utils'

import { Color } from '../types/color'

export namespace ColorNS {
  export const MODES = ['lighter', 'darker', 'glassy'] as const
  export const THEME_SOURCES = ['layer', 'text', 'border', 'accent'] as const
  export const BASE_SOURCES = [
    'success',
    'info',
    'warning',
    'error',
    'backdrop',
    'placeholder',
    'skeleton',
  ] as const
  export const SOURCES = [...THEME_SOURCES, ...BASE_SOURCES] as const

  export type Tone = Range<1, 4>
  export type Weight = Range<1, 10>
  export type Mode = typeof MODES[number]
  export type Sources = typeof SOURCES[number]
  export type BaseSources = typeof BASE_SOURCES[number]
  export type ThemeSources = typeof THEME_SOURCES[number]

  export interface Parameters {
    source?: Sources
    tone?: Tone
    mode?: Mode
    weight?: Weight
  }
}

export const color = (parameters?: ColorNS.Parameters): string => {
  const source = parameters?.source || 'layer'
  const tone = parameters?.tone || 1
  const mode = parameters?.mode
  const weight = parameters?.weight

  if (ColorNS.BASE_SOURCES.includes(<ColorNS.BaseSources>source)) {
    if (mode) {
      return `var(--zoomrc-color-${source}-${mode}-${weight || 1})`
    }
    return `var(--zoomrc-color-${source})`
  }
  if (mode) {
    return `var(--zoomrc-color-${source}-${tone}-${mode}-${weight || 1})`
  }
  return `var(--zoomrc-color-${source}-${tone})`
}

export const colorFnToColor = (givenColor: Color): string => {
  if (typeof givenColor === 'string') {
    return givenColor
  }
  return givenColor(color)
}
