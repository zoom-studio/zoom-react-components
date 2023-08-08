import { type MaybeString } from '@zoom-studio/js-ts-utils'

export type TransitionTimingFunctions =
  | 'ease'
  | 'ease-in'
  | 'ease-out'
  | 'ease-in-out'
  | 'linear'
  | 'step-end'
  | 'step-start'

export interface Transition {
  duration?: string
  delay?: string
  timingFunction?: MaybeString<TransitionTimingFunctions>
  property?: string
}
